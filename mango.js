const express = require("express")
const router = express.Router()
const { MongoClient } = require("mongodb");


 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Lendadmin:changeme123@lending.mdafc.mongodb.net/Lending?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "lending_db";
let col
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");

         const db = client.db(dbName);

         // Use the collection "users"
          col = db.collection("users");
        
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        // await client.close();
    }
}

 // create a user                                                                                                                                                             
 let user = {
    "name": { "first": "Alan", "last": "Turing" },
    "birth": new Date(1912, 5, 23), // May 23, 1912
    "userName": "alan@user.com",
    "pass": "pass",
    "phone": 1250000
}

async function create(){
// Insert a single document, wait for promise so we can read it back
try {
const p = await col.insertOne(user);
console.log(p)
} catch (e) {
    console.log(e);
  }
}
// Find one document
async function getuser(){
    try {
 const user = await col.findOne();
// Print to the console
 console.log(user);
 return user
} catch (e) {
    console.log(e);
    console.log("22222222");
  }
}
//==================================================
//*********************************************** */
router.get("/", async (req, res) => {
    try {
      const posts = await col.findOne();
      console.log(posts)
      res.json(posts);

    } catch (e) {
      console.log(e);
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await col.findById(id);
      res.json(post);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await col.findById(id);
      await post.remove();
      res.json("deleted");
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const post = await col.findByIdAndUpdate(id, { title, content });
      res.json(post);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
      const newPost = await col.create({
        title,
        content,
      });
      res.json(newPost);
    } catch (e) {
      res.status(500).send(e);
    }
  });

//************************************************ */
//===================================================
run().catch(console.dir);
module.exports = router