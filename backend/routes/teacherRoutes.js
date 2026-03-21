const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const Teacher = require("../models/Teacher")

/* STORAGE CONFIG */

const storage = multer.diskStorage({

destination: function(req,file,cb){
cb(null,"uploads/")
},

filename: function(req,file,cb){
cb(null, Date.now() + "-" + file.originalname)
}

})

const upload = multer({ storage })


/* ADD TEACHER */

router.post("/add-teacher", upload.single("photo"), async (req,res)=>{

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

router.delete("/delete-teacher/:id", async (req,res)=>{

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