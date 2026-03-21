const express = require("express")
const router = express.Router()

const Notice = require("../models/Notice")


// Add Notice
router.post("/add-notice", async(req,res)=>{

try{

const newNotice = new Notice(req.body)

await newNotice.save()

res.json({message:"Notice added successfully"})

}catch(err){

console.log(err)

res.status(500).json({message:"Error adding notice"})

}

})


// Get All Notices
router.get("/notices", async(req,res)=>{

try{

const notices = await Notice.find().sort({createdAt:-1})

res.json(notices)

}catch(err){

console.log(err)

res.status(500).json({message:"Error fetching notices"})

}

})

router.delete("/delete-notice/:id", async (req,res)=>{

try{

await Notice.findByIdAndDelete(req.params.id)

res.json({message:"Notice deleted"})

}catch(err){

res.status(500).json({message:"Error deleting notice"})

}

})

module.exports = router