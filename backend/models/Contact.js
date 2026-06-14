const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({

name:{
type:String,
trim:true,
maxlength:80
},
email:{
type:String,
trim:true,
maxlength:120
},
phone:{
type:String,
trim:true,
maxlength:20
},
message:{
type:String,
trim:true,
maxlength:1000
},
createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Contact", contactSchema)
