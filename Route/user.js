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

//==================================================
//*********************************************** */
router.get("/", async (req, res) => {
    try {
      const users = await col.findOne();
      console.log(users)
      res.json(users);

    } catch (e) {
      console.log(e);
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await col.findById(id);
      res.json(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await col.findById(id);
      await user.remove();
      res.json("deleted");
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const user = await col.findByIdAndUpdate(id, { title, content });
      res.json(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
      const newUser = await col.create({
        title,
        content,
      });
      res.json(newUser);
    } catch (e) {
      res.status(500).send(e);
    }
  });

//************************************************ */
//===================================================
run().catch(console.dir);
module.exports = router