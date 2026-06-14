const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

const admissionRoutes = require("./routes/admissionRoutes")
const noticeRoutes = require("./routes/noticeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const galleryRoutes = require("./routes/galleryRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
const contactRoutes = require("./routes/contactRoutes")
const statsRoutes = require("./routes/statsRoutes")

const app = express()
dotenv.config()

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5500")
.split(",")
.map(origin => origin.trim())

app.use(helmet({
crossOriginResourcePolicy: { policy: "cross-origin" }
}))

app.use(cors({
origin: allowedOrigins,
methods: ["GET", "POST", "DELETE"],
allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json({ limit: "100kb" }))

app.use(rateLimit({
windowMs: 15 * 60 * 1000,
limit: 300,
standardHeaders: true,
legacyHeaders: false
}))

app.use("/api/admin-login", rateLimit({
windowMs: 15 * 60 * 1000,
limit: 10,
standardHeaders: true,
legacyHeaders: false,
message: { message: "Too many login attempts. Please try again later." }
}))

/* MONGODB */

mongoose.set("sanitizeFilter", true)

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolDB")
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

app.use((err, req, res, next) => {
if(err){
console.error(err.message)
return res.status(400).json({
message: err.message || "Request failed"
})
}

return next()
})

/* START SERVER */

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log(`Server running on http://localhost:${PORT}`)
})
