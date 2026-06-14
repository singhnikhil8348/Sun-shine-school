const express = require("express")
const router = express.Router()
const { body, param } = require("express-validator")

const Contact = require("../models/Contact")
const requireAuth = require("../middleware/auth")
const validateRequest = require("../middleware/validateRequest")

/* SUBMIT CONTACT FORM */

router.post("/contact", [
body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name is required"),
body("email").trim().isEmail().normalizeEmail().withMessage("Enter a valid email"),
body("phone").optional({ checkFalsy: true }).trim().matches(/^[0-9+\-\s()]{7,20}$/).withMessage("Enter a valid phone number"),
body("message").trim().isLength({ min: 5, max: 1000 }).withMessage("Message should be 5 to 1000 characters")
], validateRequest, async (req,res)=>{

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

router.get("/contacts", requireAuth, async (req,res)=>{

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

router.delete("/delete-contact/:id", requireAuth, [
param("id").isMongoId().withMessage("Invalid contact id")
], validateRequest, async (req,res)=>{

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

module.exports = router
