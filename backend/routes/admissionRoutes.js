const express = require("express")
const router = express.Router()
const { body, param } = require("express-validator")

const Admission = require("../models/Admission")
const requireAuth = require("../middleware/auth")
const validateRequest = require("../middleware/validateRequest")

// Submit admission form
router.post("/apply", [
body("studentName").trim().isLength({ min: 2, max: 80 }).withMessage("Student name is required"),
body("className").trim().isLength({ min: 1, max: 40 }).withMessage("Class is required"),
body("parentName").trim().isLength({ min: 2, max: 80 }).withMessage("Parent name is required"),
body("phone").trim().matches(/^[0-9+\-\s()]{7,20}$/).withMessage("Enter a valid phone number"),
body("email").optional({ checkFalsy: true }).isEmail().normalizeEmail().withMessage("Enter a valid email")
], validateRequest, async (req, res) => {

try {

const newAdmission = new Admission({
studentName: req.body.studentName,
className: req.body.className,
parentName: req.body.parentName,
phone: req.body.phone,
email: req.body.email
})

await newAdmission.save()

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
router.get("/admissions", requireAuth, async (req, res) => {

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

router.get("/admission/:id", requireAuth, [
param("id").isMongoId().withMessage("Invalid admission id")
], validateRequest, async (req,res)=>{

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

router.delete("/delete-admission/:id", requireAuth, [
param("id").isMongoId().withMessage("Invalid admission id")
], validateRequest, async (req,res)=>{

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
