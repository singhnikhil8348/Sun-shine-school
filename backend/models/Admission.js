const mongoose = require("mongoose")

const admissionSchema = new mongoose.Schema({

studentName: {
type: String,
required: true
},

className: {
type: String,
required: true
},

parentName: {
type: String,
required: true
},

phone: {
type: String,
required: true
},

email: {
type: String,
},

createdAt: {
type: Date,
default: Date.now
}

})

module.exports = mongoose.model("Admission", admissionSchema)