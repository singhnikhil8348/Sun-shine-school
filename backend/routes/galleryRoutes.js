const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")
const { param } = require("express-validator")

const Gallery = require("../models/Gallery")
const requireAuth = require("../middleware/auth")
const upload = require("../middleware/uploadImage")
const validateRequest = require("../middleware/validateRequest")


/* UPLOAD IMAGE */

router.post("/upload-image", requireAuth, upload.single("image"), async (req,res)=>{

try{

if(!req.file){
return res.status(400).json({message:"Image is required"})
}

const newImage = new Gallery({
image:req.file.filename
})

await newImage.save()

res.json({
message:"Image uploaded successfully"
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Upload failed"
})

}

})


/* GET ALL IMAGES */

router.get("/gallery", async (req,res)=>{

try{

const images = await Gallery.find().sort({_id:-1})

res.json(images)

}catch(err){

res.status(500).json({
message:"Error fetching gallery"
})

}

})


/* DELETE IMAGE */

router.delete("/delete-image/:id", requireAuth, [
param("id").isMongoId().withMessage("Invalid image id")
], validateRequest, async (req,res)=>{

try{

const image = await Gallery.findById(req.params.id)

if(!image){
return res.status(404).json({message:"Image not found"})
}

const filePath = path.join(__dirname, "..", "uploads", image.image)

if(fs.existsSync(filePath)){
fs.unlinkSync(filePath)
}

await Gallery.findByIdAndDelete(req.params.id)

res.json({
message:"Image deleted successfully"
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Delete failed"
})

}

})

module.exports = router
