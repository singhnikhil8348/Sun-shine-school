const mongoose = require("mongoose")

const statsSchema = new mongoose.Schema({

students: {
type: Number,
default: 0,
min: 0,
max: 100000
},

teachers: {
type: Number,
default: 0,
min: 0,
max: 10000
},

classes: {
type: Number,
default: 0,
min: 0,
max: 1000
},

awards: {
type: Number,
default: 0,
min: 0,
max: 1000
}

})

module.exports = mongoose.model("Stats", statsSchema)
