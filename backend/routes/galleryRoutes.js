const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")

const Gallery = require("../models/Gallery")

/* STORAGE */

const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/")
},

filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}

})

const upload = multer({storage:storage})


/* UPLOAD IMAGE */

router.post("/upload-image", upload.single("image"), async (req,res)=>{

try{

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

router.delete("/delete-image/:id", async (req,res)=>{

try{

const image = await Gallery.findById(req.params.id)

if(!image){
return res.status(404).json({message:"Image not found"})
}

fs.unlinkSync("uploads/"+image.image)

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