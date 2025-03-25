const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require("bcryptjs");
const uuid = require('uuid');
const config = require('./config.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('archivelens');
const userCollection = db.collection('user');
const docCollection = db.collection('docs');
const ownerCollection = db.collection('ownership');
const authCollection = db.collection('auth');
const collabCollection = db.collection('collaborators');
const collabRequestCollection = db.collection('collabRequests');


// User operations

async function createUser(user) {
  try {
    if (await getUser("email", user.email)) {
      return null;
    }
    const hashpw = await bcrypt.hash(user.password, 10);
    user.password = hashpw;
    const result = await userCollection.insertOne(user);
    const userId = result.insertedId;
    await collabCollection.insertOne({user_id: userId, collaborators: []})
    return userId;
  } catch(ex) {
    throw new Error("Internal server error");
  }
}

async function getUser(field, value) {
  try {
    const user = await userCollection.findOne({[field]: value});
    return user;
  } catch(ex) {
    throw new Error("Internal server error");
  }
}

async function login(email, password) {
  const user = await getUser('email', email);
  if (await bcrypt.compare(password, user.password)) {
    const token = await createAuth(user);
    return {token: token, name: user.name, email: user.email};
  }
  return null;
}

// auth operations

async function deleteAuth(token) {
  try {
    await authCollection.deleteOne({token: token});
} catch(ex) {
  throw new Error("Internal server error");
  }
}

async function createAuth(user) {
  try {
    const token = uuid.v4();
    const authUser = {
      token: token,
      email: user.email,
      name: user.name,
      user_id: user._id

    }
    await authCollection.insertOne(authUser);
    return token;
  } catch(ex) {
  throw new Error("Internal server error");
  }
}

async function getAuth(authToken) {
  const user = await authCollection.findOne({token: authToken});
  const id = await user.user_id;
  return await getUser("_id", user.user_id);
}

async function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).send({"Error": "unauthorized"})
  }
  next();
}

async function authenticated(req, res, next) {
  if (req.cookies.token) {
    const user = await authCollection.findOne({token: req.cookies.token});
    if (user) {
      req.user = user;
    }
  }
  next();
}

// document operations

function generateMetadata(req) {
  const tags = req.body.tags.split(',').map(tag => tag.trim());
  return {
    title: req.body.title,
    author: req.body.author,
    date: new Date(req.body.date),
    location: req.body.location,
    tags: tags,
    key: req.file.key
  }
}

function generateRights(userId, docId, role) {
  return {
    user_id: userId,
    document_id: docId,
    role: role
  }
}


async function createDocument(req, res, next) {
  const document = generateMetadata(req)
  const result = await docCollection.insertOne(document);
  const docId = result.insertedId;
  const rights = generateRights(req.user.user_id, docId, 'owner')
  await ownerCollection.insertOne(rights);
  next();
}

async function getAllDocuments(userId) {
  const ownership = await ownerCollection.find({user_id: userId}).toArray();
  var docIds = ownership.map((doc) => doc.document_id);
  const documents = await docCollection.find({"_id": {$in: docIds}}).toArray();
  return documents
}


async function getDocuments(req) {
  const filter = getFilterFromQuery(req);
  const ownership = await ownerCollection.find({user_id: req.user.user_id}).toArray();
  if (filter.roles) {
    var docIds = [];
    for (const doc of ownership) {
      if (filter.roles.includes(doc.role)) {
        docIds.push(doc.document_id)
      }
    }
  } else {
    var docIds = ownership.map((doc) => doc.document_id);
  }
  var query = {"_id": {$in: docIds}};
  if (filter.authors) {
    query.author = {$nin: filter.authors}
  }
  if (filter.daterange) {
    const startDate = filter.daterange[0];
    const endDate = (new Number(filter.daterange[1]) + 1).toString()
    query.date = {$gte: new Date(startDate), $lte: new Date(endDate)};
    console.log(query.date);
    // const startDate = new Date(filter.daterange[0]); // Start of the range
    // const endDate = new Date(filter.daterange[1]);  // Copy to avoid modifying original
    // endDate.setFullYear(endDate.getFullYear() + 1); // Move to start of the next year
    // endDate.setMonth(0, 1);  // Set to January 1st
    // endDate.setHours(0, 0, 0, 0); // Midnight
  
    query.date = { $gte: startDate, $lt: endDate };
    console.log(query.date);
  }
  console.log(query);
  const result = await docCollection.find(query).toArray();
  return result;
}

function getFilterFromQuery(req) {
  filter = {};
  if (req.query.exclude) {
    filter.authors = req.query.exclude.split(",");
  }
  if (req.query.roles) {
    filter.roles = req.query.roles.split(',');
  }
  if (req.query.daterange) {
    // const range = req.query.daterange.split(',');
    filter.daterange = req.query.daterange.split(',');
    // range.map((date) => new Date(date)).sort();
  }
  return filter;
}

async function getDocumentById(id) {
  return await docCollection.findOne({_id: new ObjectId(id)});
}

function createFilter(documents) {
    var authors = [];
    var dates = [];
    for (const document of documents) {
        if (!authors.includes(document.author)) {
        authors.push(document.author);
        }
        dates.push(document.date)
    }
    return {authors: authors,
            dates: getDateEnds(dates)};
}

function getDateEnds(dates) {
  const converted = dates.map(date => new Date(date).getFullYear())
  return [Math.min(...converted), Math.max(...converted)]
}


async function getOwned(userId, role) {
  var query = {user_id: userId};
  if (role) {
    query.role = {$in: role};
  }
  try {
  return await ownerCollection.find(query).toArray();
  } catch(ex) {
    throw new Error("Internal server error");
  }
}

async function getDocs(ids, authors, dates) {
  var query = {_id: {$in: ids}};
  if (authors) {
    query.author = {$nin: authors};
  }
  if (dates) {
    query.date = {$gte: new Date(dates[0]), $lte: new Date(dates[1])};
  }
  try {
    return await docCollection.find(query).toArray();
  } catch(ex) {
    throw new Error("Internal server error");
  }
}

function joinOwnerAndDocs(owners, docList) {
  for (const doc of docList) {
    doc.role = owners.find((owner) => owner.document_id.equals(doc._id)).role;
    doc._id = doc._id.toString();
  }
  return docList;
}

async function getUserDocuments(email, authors, dates, roles) {
  const userId = await getUserId(email);
  const owners = await getOwned(userId, roles);
  var docList = await getDocs(owners.map((ownership) => ownership.document_id), authors, dates);
  return joinOwnerAndDocs(owners, docList);
}

// sharing functions

async function collabRequest(userId, collabEmail) {
  const collaborator = await getUser("email", collabEmail);
  console.log(collaborator);
  if (collaborator) {
    await collabRequestCollection.insertOne({
      sender: userId,
      recipient: collaborator._id
    })
  }
}

// async function addCollaborator(req, res, next) {
//   if (req.body.email === req.user.email) {
//     return res.status(403).send("Cannot add self as collaborator")
//   }
//   const collaboratorId = await getUser("email", req.body.email);
//   if (collaboratorId) {
//     collabCollection.updateMany({user_id: req.user.user_id, $addToSet: {collaborators: collaboratorId}})
//   }
//   next();
// }

module.exports = {
  getUserDocuments,
  createUser,
  // newDoc,
  createAuth,
  deleteAuth,
  getAuth,
  getUser,
  login,
  authenticated,
  requireAuth,
  createDocument,
  createFilter,
  getAllDocuments,
  getDocuments,
  getDocumentById,
  collabRequest,
}