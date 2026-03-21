const mongoose = require("mongoose")

const statsSchema = new mongoose.Schema({

students: {
type: Number,
default: 0
},

teachers: {
type: Number,
default: 0
},

classes: {
type: Number,
default: 0
},

awards: {
type: Number,
default: 0
}

})

module.exports = mongoose.model("Stats", statsSchema)