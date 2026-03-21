const express = require("express")
const router = express.Router()

const Admission = require("../models/Admission")

// Submit admission form
router.post("/apply", async (req, res) => {

console.log("Form data received:", req.body)

try {

const newAdmission = new Admission(req.body)

await newAdmission.save()

console.log("Data saved to MongoDB")

res.json({
message: "Application submitted successfully"
})

} catch (err) {

console.log("Error saving data:", err)

res.status(500).json({
message: "Error saving application"
})

}

})


// Get all admissions (for admin dashboard)
router.get("/admissions", async (req, res) => {

try {

const admissions = await Admission.find().sort({ createdAt: -1 })

res.json(admissions)

} catch (err) {

console.log("Error fetching admissions:", err)

res.status(500).json({
message: "Error fetching admissions"
})

}

})

/* GET SINGLE ADMISSION */

router.get("/admission/:id", async (req,res)=>{

try{

const admission = await Admission.findById(req.params.id)

res.json(admission)

}catch(err){

res.status(500).json({
message:"Error fetching admission"
})

}

})

/* DELETE ADMISSION */

router.delete("/delete-admission/:id", async (req,res)=>{

try{

await Admission.findByIdAndDelete(req.params.id)

res.json({
message:"Admission deleted successfully"
})

}catch(err){

res.status(500).json({
message:"Error deleting admission"
})

}

})

module.exports = router