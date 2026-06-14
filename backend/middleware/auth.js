const jwt = require("jsonwebtoken")

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ""
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: "Authentication required" })
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired session" })
  }
}

module.exports = requireAuth
