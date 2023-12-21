const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;



// middlewer
app.use(cors());
app.use(express.json())

// pass: HGjVqiLDfN8PWQhJ
// user: task-managemnt
console.log(process.env.DB_PASS);
console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.loifkbc.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://<username>:<password>@cluster0.loifkbc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();


      const taskCollection =client.db('taskDb').collection('task')

      app.post('/tasks', async(req,res)=>{
            const task =req.body;
            const result =await taskCollection.insertOne(task);
            res.send(result)
      })

      app.get('/tasks/user', async (req, res) => {
            const email = req.query.email;
            // console.log("its a my card", email);
            const query = { user: email }
            const result = await taskCollection.find(query).toArray();
            console.log(result);
            res.send(result)
      })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
      res.send('simple CRUD in Running')
})
app.listen(port, ()=>{
      console.log(`Simple CURD is running on port,${port}`);
})