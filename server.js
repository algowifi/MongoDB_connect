const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Connection URL and Database Name
const url = 'mongodb://mongodb:27017'; // Assuming MongoDB is running locally
const dbName = 'sconto_matto'; // Replace with your database name
const collectionName = 'utenti'

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient(url);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

const db = client.db(dbName);
const collection = db.collection(collectionName);

// API endpoint to query the database
app.post('/query', async (req, res) => {
  try {
    const query = req.body;
    // Convert _id to ObjectId if present in query
    if (query._id && typeof query._id === 'string') {
      try {
        query._id = new ObjectId(query._id);
      } catch (e) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
    }
    const results = await collection.find(query).toArray();
    res.json(results);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Error querying database' });
  }
});

// API endpoint to add data to the database
app.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const result = await collection.insertOne(data);
    res.status(201).json({ message: 'Data added successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error adding data to database:', error);
    res.status(500).json({ message: 'Error adding data to database' });
  }
});

// API endpoint to check database connection
app.get('/check-connection', async (req, res) => {
    try {
        await client.db('admin').command({ ping: 1 });
        res.json({ message: 'Successfully connected to MongoDB!' });
    } catch (error) {
        console.error('Error checking database connection:', error);
        res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
