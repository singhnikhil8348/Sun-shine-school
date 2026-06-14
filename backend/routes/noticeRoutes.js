const express = require("express")
const router = express.Router()
const { body, param } = require("express-validator")

const Notice = require("../models/Notice")
const requireAuth = require("../middleware/auth")
const validateRequest = require("../middleware/validateRequest")


// Add Notice
router.post("/add-notice", requireAuth, [
body("title").trim().isLength({ min: 3, max: 120 }).withMessage("Title should be 3 to 120 characters"),
body("description").trim().isLength({ min: 5, max: 1000 }).withMessage("Description should be 5 to 1000 characters"),
body("date").trim().isLength({ min: 3, max: 40 }).withMessage("Date is required")
], validateRequest, async(req,res)=>{

try{

const newNotice = new Notice({
title: req.body.title,
description: req.body.description,
date: req.body.date
})

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

router.delete("/delete-notice/:id", requireAuth, [
param("id").isMongoId().withMessage("Invalid notice id")
], validateRequest, async (req,res)=>{

try{

await Notice.findByIdAndDelete(req.params.id)

res.json({message:"Notice deleted"})

}catch(err){

res.status(500).json({message:"Error deleting notice"})

}

})

module.exports = router
