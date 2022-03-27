// starting express 
const express = require("express");
const app = express();
const user = require ("./Route/user.js")
//const user = require ("./mango")

app.use("/user",user)



//==========================================


app.get("/", async (req, res) => {
    try {
    
      res.json("yesss ");
     
    } catch (e) {
      console.log(e);
      console.log("11111111111111111");
    }
  });
  
  app.listen(3000, function(){console.log("sever start")})