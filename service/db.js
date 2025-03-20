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
      user_id: user.id
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
  console.log(user);

  console.log("Found");
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
  return {
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    location: req.body.location,
    tags: req.body.tags,
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
  const docId = await docCollection.insertOne(document);
  const rights = generateRights(req.user.user_id, docId, 'owner')
  await ownerCollection.insertOne(rights);
  next();
}

// async function createDoc(doc) {
//   try {
//     const result = await docCollection.insertOne(doc);
//     const documentId = result;
//     return documentId.insertedId;

//   } catch(ex) {
//     throw new Error("Internal server error");
//   }
// }

// async function addOwner(userId, documentId, role) {
//   try {
//     await ownerCollection.insertOne({
//       user_id: userId,
//       document_id: documentId,
//       role: role
//       }
//     )
//   } catch(ex) {
//     throw new Error("Internal server error")
//   }
// }

// async function newDoc(userId, doc, role) {
//   // const userId = await getUserId(email);
//   const docId = await createDoc(doc);
//   await addOwner(userId, docId, role);
// }

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

module.exports = {
  getUserDocuments,
  createUser,
  newDoc,
  createAuth,
  deleteAuth,
  getAuth,
  getUser,
  login,
  authenticated,
  requireAuth,
  createDocument,
}