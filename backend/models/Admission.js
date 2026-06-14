const mongoose = require("mongoose")

const admissionSchema = new mongoose.Schema({

studentName: {
type: String,
required: true,
trim: true,
maxlength: 80
},

className: {
type: String,
required: true,
trim: true,
maxlength: 40
},

parentName: {
type: String,
required: true,
trim: true,
maxlength: 80
},

phone: {
type: String,
required: true,
trim: true,
maxlength: 20
},

email: {
type: String,
trim: true,
maxlength: 120
},

createdAt: {
type: Date,
default: Date.now
}

})

module.exports = mongoose.model("Admission", admissionSchema)
