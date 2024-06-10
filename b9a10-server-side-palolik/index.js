const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
// app.use(cors({
//     origin: `https://samia-11824.web.app`
// }));

app.use(
    cors({
    origin: "https://samia-11824.web.app",
    })
    );
app.use(express.json());
//prottoy2441139
//PCcEnjG5yyVwyxIw

// console.log(process.env.EMAILDB)
const uri = `mongodb+srv://${process.env.EMAILDB}:${process.env.PASSDB}@cluster0.fagav7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

      const client = new MongoClient(uri, {
          serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
          }
      });

      await client.connect();

      const craftCollection = client.db('CraftsmanDB').collection('Crafts')
      const categoryCollection = client.db('CraftsmanDB').collection('categoryCrafts')


      app.get('/', (req, res) => {
          res.send('Simple CRUD is running');
      });

     
      app.get('/allData', async (req, res) => {
          const craft = craftCollection.find();
          const category = categoryCollection.find();
          const craftResult = await craft.toArray();
          const categoryResult = await category.toArray();
          const result = { categoryResult, craftResult };
          console.log(result);
          res.send(result);
      });


  
      app.get('/allCrafts', async (req, res) => {
          const cursor = craftCollection.find();
          const result = await cursor.toArray();
          res.send(result);
      });

     
      app.get('/allCrafts/a', async (req, res) => {
          const cursor = craftCollection.find().sort({rating:1});
          const result = await cursor.toArray();
          res.send(result);
      });
     
      app.get('/allCrafts/d', async (req, res) => {
          const cursor = craftCollection.find().sort({rating:-1});
          const result = await cursor.toArray();
          res.send(result);
      });

      
      app.get('/craft/:id', async (req, res) => {
          const craftId = req.params.id;
          console.log('ID', craftId);
          const query = { _id: new ObjectId(craftId) };
          const result = await craftCollection.findOne(query);
          res.send(result);
      });
      
    
      app.get('/myCraft/:email', async (req, res) => {
          const craftEmail = req.params.email;
          console.log('Email', craftEmail);

          const query = { userEmail: craftEmail };
          const cursor = craftCollection.find(query);
          const result = await cursor.toArray()
          res.send(result);
      });

     
      app.get('/catagory/:subcategory_name', async (req, res) => {
          const categoryId = req.params.subcategory_name;
          console.log('category', categoryId);

          const query = { subcategory_Name: categoryId };
          const cursor = craftCollection.find(query);
          const result = await cursor.toArray()
          res.send(result);
      });
      
   
      app.post('/addCraft', async (req, res) => {
          const newCraft = req.body;
          console.log(newCraft);
          const result = await craftCollection.insertOne(newCraft);
          res.send(result);
      });

     
      app.put('/craft/:id', async (req, res) => {
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
          const options = { upsert: true };
          const updatedCraft = req.body;
          const craft = {
              $set: {
                  image: updatedCraft.image,
                  item_name: updatedCraft.item_name,
                  subcategory_Name: updatedCraft.subcategory_Name,
                  price: updatedCraft.price,
                  shortDescription: updatedCraft.shortDescription,
                  rating: updatedCraft.rating,
                  customization: updatedCraft.customization,
                  processing_time: updatedCraft.processing_time,
                  stockStatus: updatedCraft.stockStatus,
                  userEmail: updatedCraft.userEmail,
                  userName: updatedCraft.userName,
              }
          }
          const result = await craftCollection.updateOne(filter, craft, options);
          res.send(result);
      });

      // delete entry by id
      app.delete('/delCraft/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          console.log('delete: ');
          const result = await craftCollection.deleteOne(query);
          res.send(result);
      });

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");


      app.listen(port, () => {
          console.log(`Server is running on port: ${port}`);
      });

  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  }
}
run().catch(console.dir);

