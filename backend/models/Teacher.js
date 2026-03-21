const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({

name:String,
subject:String,
qualification:String,
experience:String,
photo:String

})

module.exports = mongoose.model("Teacher", teacherSchema)