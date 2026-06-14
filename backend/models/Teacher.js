const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({

name:{
type:String,
trim:true,
maxlength:80
},
subject:{
type:String,
trim:true,
maxlength:80
},
qualification:{
type:String,
trim:true,
maxlength:120
},
experience:{
type:String,
trim:true,
maxlength:80
},
photo:{
type:String,
trim:true,
maxlength:120
}

})

module.exports = mongoose.model("Teacher", teacherSchema)
