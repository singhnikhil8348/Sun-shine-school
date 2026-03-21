const express = require("express")
const router = express.Router()

const Contact = require("../models/Contact")

/* SUBMIT CONTACT FORM */

router.post("/contact", async (req,res)=>{

try{

const contact = new Contact({

name:req.body.name,
email:req.body.email,
phone:req.body.phone,
message:req.body.message

})

await contact.save()

res.json({
message:"Message sent successfully"
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Error sending message"
})

}

})


/* GET ALL MESSAGES (ADMIN) */

router.get("/contacts", async (req,res)=>{

try{

const contacts = await Contact.find().sort({createdAt:-1})

res.json(contacts)

}catch(err){

res.status(500).json({
message:"Error fetching messages"
})

}

})


/* DELETE MESSAGE */

router.delete("/delete-contact/:id", async (req,res)=>{

try{

await Contact.findByIdAndDelete(req.params.id)

res.json({
message:"Message deleted"
})

}catch(err){

res.status(500).json({
message:"Delete failed"
})

}

})

/* DELETE CONTACT MESSAGE */

router.delete("/delete-contact/:id", async (req,res)=>{

try{

await Contact.findByIdAndDelete(req.params.id)

res.json({
message:"Message deleted successfully"
})

}catch(err){

res.status(500).json({
message:"Error deleting message"
})

}

})

module.exports = router