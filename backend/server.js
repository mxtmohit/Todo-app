const express = require("express");
const Task = require("./models/Task");
const app = express();
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./config/dbConfig");



require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/gettask", async (req, res) => {
  const task = await Task.find();
  return res.status(200).json(task);
});

app.put("/update", async(req, res) => {
 
  const {_id,title,description,taskStatus}=req.body
  try {
     const task = await Task.updateOne(
       { _id:_id }, // Query to find the document(s) to update
       {
         $set: {
          
           title:title,
           description:description,
           status:taskStatus
         },
       } // Update operation
     );
      return res.status(200).json(task);
  } catch (error) {
    
     return res.status(200).send("could not update try again later")
  }
 


});

app.delete("/deletetask/:id", async(req, res) => {

 
  const _id=req.params.id
  try {
    const respo=await Task.deleteOne({ _id });
   
    return res.status(200).send("deleted successfully");
  } catch (error) {
    return res.status(302).send("sorry couldnt delete");
  }
  
  
  
});

app.post("/addtask",async (req, res) => {

  const task = req.body.task
  try {
    const newTask = Task(task);
    await newTask.save();
    return res.status(200).json({message:"Task Added Successfully",_id:newTask._id})
    
  } catch (error) {
    return res.status(301).send("Not able to add task please try again later")
  }
  
  

});
connectDB()
app.listen(5000, () => {
  console.log("server is running on 5000");
});
