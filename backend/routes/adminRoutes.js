const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body } = require("express-validator")
const validateRequest = require("../middleware/validateRequest")
const router = express.Router()

router.post("/admin-login",[
body("username").trim().notEmpty().withMessage("Username is required"),
body("password").isLength({ min: 8 }).withMessage("Password is required")
], validateRequest, async (req,res)=>{

const {username,password} = req.body

const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
const jwtSecret = process.env.JWT_SECRET

if(!adminUsername || (!adminPassword && !adminPasswordHash) || !jwtSecret){
return res.status(500).json({
message:"Admin authentication is not configured"
})
}

const usernameMatches = username === adminUsername
const passwordMatches = adminPasswordHash
? await bcrypt.compare(password, adminPasswordHash)
: password === adminPassword

if(!usernameMatches || !passwordMatches){
return res.status(401).json({
message:"Invalid username or password"
})
}

const token = jwt.sign({ role:"admin" }, jwtSecret, { expiresIn:"2h" })

return res.json({
success:true,
token
})

})

module.exports = router
