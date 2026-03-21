const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const admissionRoutes = require("./routes/admissionRoutes")
const noticeRoutes = require("./routes/noticeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const galleryRoutes = require("./routes/galleryRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
const contactRoutes = require("./routes/contactRoutes")
const statsRoutes = require("./routes/statsRoutes")

const app = express()

app.use(cors())
app.use(express.json())

/* MONGODB */

mongoose.connect("mongodb://127.0.0.1:27017/schoolDB")
.then(()=>{
console.log("Database connected successfully")
})
.catch(err=>{
console.log("MongoDB connection error:",err)
})

/* TEST ROUTE */

app.get("/",(req,res)=>{
res.send("School API Running")
})

/* API ROUTES */

app.use("/api", admissionRoutes)
app.use("/api", noticeRoutes)
app.use("/api", adminRoutes)
app.use("/api", galleryRoutes)
app.use("/api", teacherRoutes)
app.use("/api", contactRoutes)
app.use("/api", statsRoutes)

/* STATIC UPLOADS */

app.use("/uploads", express.static("uploads"))

/* START SERVER */

app.listen(5000,()=>{
console.log("Server running on http://localhost:5000")
})