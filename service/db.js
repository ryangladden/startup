const { MongoClient, ObjectId } = require('mongodb');
const config = require('./config.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('archivelens');
const userCollection = db.collection('user');
const docCollection = db.collection('docs');
const ownerCollection = db.collection('ownership')


// User operations

async function createUser(user) {
  try {
    const result = await userCollection.insertOne(user);
    const userId = result.insertedId;
    return userId;
  } catch(ex) {
    throw new Error("Internal server error");
  }
}

async function getUserId(email) {
  try {
    const user = await userCollection.findOne({email: email});
    return user._id;
  } catch(ex) {
    throw new Error("Internal server error");
  }
}

// document operations

async function createDoc(doc) {
  try {

    const result = await docCollection.insertOne(doc);
    const documentId = result;
    return documentId.insertedId;

  } catch(ex) {
    throw new Error("Internal server error");
  }
}

async function addOwner(userId, documentId, role) {
  try {
    await ownerCollection.insertOne({
      user_id: userId,
      document_id: documentId,
      role: role
      }
    )
  } catch(ex) {
    throw new Error("Internal server error")
  }
}

async function getOwnershipList(userId) {
  return await ownerCollection.find({user_id: userId}).toArray();
}

async function getDocsFromIds(ids) {
  return await docCollection.find({_id: { $in: ids}}).toArray();
}

async function getDocsByExcludeAuthor(ids, authors, dates) {
  return await docCollection.find({_id: {'$in': ids}, author: {'$nin': authors}, date: {$gte: new Date(dates[0]), $lte: new Date(dates[1])}}).toArray();
}

function joinOwnerAndDocs(owners, docList) {
  for (const doc of docList) {
    doc.role = owners.find((owner) => owner.document_id.equals(doc._id)).role;
  }
  return docList;
}

async function getUserDocuments(email) {
  const userId = await getUserId(email);
  const owners = await getOwnershipList(userId);
  var docList = await getDocsByExcludeAuthor(owners.map((ownership) => ownership.document_id), []);
  return joinOwnerAndDocs(owners, docList);
}

(async function test(){
  const userId = new ObjectId('67d8342878927094228378d9');
  // date = new Date('1953-12-14');
  // const docId = await createDoc({title: "Old document", author: "Elizabeth Swan", date: date, location: "Miami Beach, Florida, United States", tags: ['joe', 'mama']});
  // await addOwner(userId, docId, "viewer");

  const docs = await getUserDocuments("ryan@gladdenfamily.org");
  console.log(docs);
})();