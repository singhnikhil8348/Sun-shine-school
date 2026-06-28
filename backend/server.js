// Replace the entire file with this:

const express = require("express")
const { MongoClient } = require("mongodb")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const compression = require("compression")
const morgan = require("morgan")
const dotenv = require("dotenv")

dotenv.config()
const app = express()

/* Basic middleware */
app.use(helmet())
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))
app.use(compression())

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5500,http://localhost:5500")
  .split(",")
  .map(o => o.trim())

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error("CORS: origin not allowed"), false)
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

const corsMiddleware = cors(corsOptions)
app.use(corsMiddleware)

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return corsMiddleware(req, res, next)
  }
  next()
})

app.use(express.json({ limit: "100kb" }))
app.use(express.urlencoded({ extended: true, limit: "100kb" }))

/* Rate limiters */
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }))
app.use("/api/admin-login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 }))
app.use("/api/forgot-password", rateLimit({ windowMs: 15 * 60 * 1000, limit: 5 }))
app.use("/api/reset-password", rateLimit({ windowMs: 15 * 60 * 1000, limit: 5 }))

/* MongoDB direct connection */
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"
let db = null

const client = new MongoClient(MONGO_URI)

client.connect()
  .then(() => {
    console.log("MongoDB connected")
    db = client.db("schoolDB")
  })
  .catch(err => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

/* Health check */
app.get("/", (req, res) => res.send("School API running"))

/* API endpoints */
app.get("/api/teachers", async (req, res, next) => {
  try { res.json(await db.collection("teachers").find({}).toArray() || []) } catch (err) { next(err) }
})

app.get("/api/notices", async (req, res, next) => {
  try { res.json(await db.collection("notices").find({}).toArray() || []) } catch (err) { next(err) }
})

app.post("/api/notices", async (req, res, next) => {
  try {
    const doc = req.body
    if (!doc || !doc.title) return res.status(400).json({ message: "title required" })
    const r = await db.collection("notices").insertOne(Object.assign({}, doc, { createdAt: new Date() }))
    res.json({ insertedId: r.insertedId })
  } catch (err) { next(err) }
})

app.get("/api/admissions", async (req, res, next) => {
  try { res.json(await db.collection("admissions").find({}).toArray()) } catch (err) { next(err) }
})

app.post("/api/admissions", async (req, res, next) => {
  try {
    const r = await db.collection("admissions").insertOne(Object.assign({}, req.body, { createdAt: new Date() }))
    res.json({ insertedId: r.insertedId })
  } catch (err) { next(err) }
})

app.get("/api/galleries", async (req, res, next) => {
  try { res.json(await db.collection("galleries").find({}).toArray() || []) } catch (err) { next(err) }
})

app.get("/api/contacts", async (req, res, next) => {
  try { res.json(await db.collection("contacts").find({}).toArray() || []) } catch (err) { next(err) }
})

app.post("/api/contacts", async (req, res, next) => {
  try {
    const r = await db.collection("contacts").insertOne(Object.assign({}, req.body, { createdAt: new Date() }))
    res.json({ insertedId: r.insertedId })
  } catch (err) { next(err) }
})

app.get("/api/stats", async (req, res, next) => {
  try {
    const teachers = await db.collection("teachers").countDocuments()
    const notices = await db.collection("notices").countDocuments()
    const admissions = await db.collection("admissions").countDocuments()
    const galleries = await db.collection("galleries").countDocuments()
    const contacts = await db.collection("contacts").countDocuments()
    res.json({ teachers, notices, admissions, galleries, contacts })
  } catch (err) { next(err) }
})

app.post("/api/admin-login", async (req, res, next) => {
  try {
    const { username, password } = req.body || {}
    console.log("Login attempt:", { username, password })
    
    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" })
    }
    
    const admin = await db.collection("admin").findOne({ username })
    console.log("Admin found:", admin)
    
    if (!admin) {
      return res.status(401).json({ message: "user not found" })
    }
    
    if (admin.password !== password) {
      return res.status(401).json({ message: "password mismatch" })
    }
    
    return res.json({ token: "dev-token-" + Date.now(), user: { username: admin.username } })
  } catch (err) { 
    console.error("Login error:", err)
    next(err) 
  }
})

/* Forgot Password - generate reset token */
app.post("/api/forgot-password", async (req, res, next) => {
  try {
    const { username } = req.body || {}
    if (!username) return res.status(400).json({ message: "username required" })
    
    const admin = await db.collection("admin").findOne({ username })
    if (!admin) return res.status(401).json({ message: "user not found" })
    
    const resetToken = Math.random().toString(36).substring(2, 15) + Date.now()
    
    await db.collection("resetTokens").updateOne(
      { username },
      { 
        $set: { 
          username, 
          resetToken, 
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        }
      },
      { upsert: true }
    )
    
    return res.json({ resetToken, message: "Reset token generated. Valid for 10 minutes." })
  } catch (err) { next(err) }
})

/* Reset Password */
app.post("/api/reset-password", async (req, res, next) => {
  try {
    const { username, newPassword, resetToken } = req.body || {}
    if (!username || !newPassword || !resetToken) {
      return res.status(400).json({ message: "username, newPassword, and resetToken required" })
    }
    
    const tokenRecord = await db.collection("resetTokens").findOne({ 
      username, 
      resetToken,
      expiresAt: { $gt: new Date() }
    })
    
    if (!tokenRecord) {
      return res.status(401).json({ message: "Invalid or expired reset token" })
    }
    
    const result = await db.collection("admin").updateOne(
      { username },
      { $set: { password: newPassword } }
    )
    
    if (result.matchedCount === 0) {
      return res.status(401).json({ message: "user not found" })
    }
    
    await db.collection("resetTokens").deleteOne({ username, resetToken })
    
    return res.json({ message: "Password reset successfully" })
  } catch (err) { next(err) }
})

/* Error handler */
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err)
  res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Server error" : (err.message || "Server error") })
})

/* Process handlers */
process.on("unhandledRejection", r => console.error("UnhandledRejection:", r))
process.on("uncaughtException", e => { console.error("UncaughtException:", e); process.exit(1) })

/* Start */
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))