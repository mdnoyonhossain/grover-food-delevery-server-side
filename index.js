const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// midle ward 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n3a0m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const servicesCollection = client.db('Grover').collection('services');
    const reviewsCollection = client.db('Grover').collection('orders')

    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const result = await cursor.toArray()
      res.send(result)
    });
    app.get('/delevary', async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const result = await cursor.limit(3).toArray()
      res.send(result)
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const service = await servicesCollection.findOne(query)
      res.send(service)
    })

    app.post('/services', async (req, res) => {
      const services = req.body;
      const result = await servicesCollection.insertOne(services);
      res.send(result)
    })

    // order API 

    app.get('/reviews', async (req, res) => {
      let query = {};
      if(req.query.email){
        query = {
          email: req.query.email
        }
      }
      const cursor = reviewsCollection.find(query);
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/reviews', async (req, res) =>{
      const order = req.body;
      const result = await reviewsCollection.insertOne(order);
      res.send(result)
    })

    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    })

  }
  finally {

  }
}

run().catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('Quick Eat Server is Running');
});

app.listen(port, () => {
  console.log(`Quick Eat Server on port ${port}`);
});