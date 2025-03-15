const { MongoClient } = require('mongodb');
const config = require('./config.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('archivelens');
const userCollection = db.collection('user');
const docCollection = db.collection('docs');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

async function main() {
  try {
    const user = {
        name: "Ryan Gladden",
        email: "ryan@gladdenfamily.org",
    }

    await userCollection.insertOne(user);

    } catch(ex) {
        console.log("error");
    } finally {
        await client.close();
    }
}

main();