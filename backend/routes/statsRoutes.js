const express = require("express")
const router = express.Router()

const Stats = require("../models/Stats")

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

router.post("/update-stats", async (req, res) => {

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