const jwt = require("jsonwebtoken")

exports.usesAuthToken = async (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers.authorization.split(" ")
    try {
      if (token[1] && token[0] === "Bearer") {
        req.jwt = jwt.verify(token[1], process.env.JWT_SECRET)
        next()
      } else {
        res.status(401).json({ error: "Not authorized. Please login" })
      }      
    } catch (error) {
      res.status(403).json({ error: "Token not authorized" })
    }
  } else {
    res.status(401).json({ error: "Not authorized. Please login" })
  }
}
