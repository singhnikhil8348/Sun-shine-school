const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({

title:{
type:String,
required:true,
trim:true,
maxlength:120
},

description:{
type:String,
required:true,
trim:true,
maxlength:1000
},

date:{
type:String,
required:true,
trim:true,
maxlength:40
}

},{timestamps:true})

module.exports = mongoose.model("Notice", noticeSchema)
