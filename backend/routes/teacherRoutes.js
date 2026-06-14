const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")
const { body, param } = require("express-validator")

const Teacher = require("../models/Teacher")
const requireAuth = require("../middleware/auth")
const upload = require("../middleware/uploadImage")
const validateRequest = require("../middleware/validateRequest")


/* ADD TEACHER */

router.post("/add-teacher", requireAuth, upload.single("photo"), [
body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Teacher name is required"),
body("subject").trim().isLength({ min: 2, max: 80 }).withMessage("Subject is required"),
body("qualification").trim().isLength({ min: 2, max: 120 }).withMessage("Qualification is required"),
body("experience").trim().isLength({ min: 1, max: 80 }).withMessage("Experience is required")
], validateRequest, async (req,res)=>{

try{

if(!req.file){
return res.status(400).json({message:"Photo required"})
}

const teacher = new Teacher({

name:req.body.name,
subject:req.body.subject,
qualification:req.body.qualification,
experience:req.body.experience,
photo:req.file.filename

})

await teacher.save()

res.json({
message:"Teacher added successfully"
})

}catch(err){

console.log("Add teacher error:",err)

res.status(500).json({
message:"Error adding teacher"
})

}

})


/* GET ALL TEACHERS */

router.get("/teachers", async (req,res)=>{

try{

const teachers = await Teacher.find().sort({_id:-1})

res.json(teachers)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error fetching teachers"
})

}

})


/* DELETE TEACHER */

router.delete("/delete-teacher/:id", requireAuth, [
param("id").isMongoId().withMessage("Invalid teacher id")
], validateRequest, async (req,res)=>{

try{

const teacher = await Teacher.findById(req.params.id)

if(!teacher){
return res.status(404).json({message:"Teacher not found"})
}

const filePath = path.join(__dirname,"../uploads/",teacher.photo)

if(fs.existsSync(filePath)){
fs.unlinkSync(filePath)
}

await Teacher.findByIdAndDelete(req.params.id)

res.json({
message:"Teacher deleted successfully"
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Delete failed"
})

}

})

module.exports = router
