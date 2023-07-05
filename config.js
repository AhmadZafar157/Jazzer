const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://azafar506:Ahmad_zafar1999.@cluster0.krhpsmf.mongodb.net/?retryWrites=true&w=majority";
const schema = require('./app/models/user')

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runConnection() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    const connection = await client.connect();
    const db = connection.db("Jazzer");
    // const collection = db.collection("Users");
    // Send a ping to confirm a successful connection
    
    const res = await db.command({ ping: 1 });
    console.log("response from db server check !" + res);
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

module.exports = { runConnection };
