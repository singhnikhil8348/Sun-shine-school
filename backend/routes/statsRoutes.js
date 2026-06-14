const express = require("express")
const router = express.Router()
const { body } = require("express-validator")

const Stats = require("../models/Stats")
const requireAuth = require("../middleware/auth")
const validateRequest = require("../middleware/validateRequest")

/* GET STATS */

router.get("/stats", async (req, res) => {

try {

let stats = await Stats.findOne()

// If no stats exist → create default
if (!stats) {

stats = new Stats()
await stats.save()

}

res.json(stats)

} catch (err) {

console.log(err)

res.status(500).json({
message: "Error fetching stats"
})

}

})



/* UPDATE STATS */

router.post("/update-stats", requireAuth, [
body("students").isInt({ min: 0, max: 100000 }).withMessage("Students must be a positive number"),
body("teachers").isInt({ min: 0, max: 10000 }).withMessage("Teachers must be a positive number"),
body("classes").isInt({ min: 0, max: 1000 }).withMessage("Classes must be a positive number"),
body("awards").isInt({ min: 0, max: 1000 }).withMessage("Awards must be a positive number")
], validateRequest, async (req, res) => {

try {

let stats = await Stats.findOne()

if (!stats) {

stats = new Stats(req.body)

} else {

stats.students = req.body.students
stats.teachers = req.body.teachers
stats.classes = req.body.classes
stats.awards = req.body.awards

}

await stats.save()

res.json({
message: "Stats updated successfully"
})

} catch (err) {

console.log(err)

res.status(500).json({
message: "Error updating stats"
})

}

})

module.exports = router
