const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.login = async (req, res) => {
  try {
    const refreshId = req.body.id + process.env.JWT_SECRET
    const hash = await bcrypt.hash(refreshId, 10)

    req.body.refreshKey = 10

    const token = jwt.sign(req.body, process.env.JWT_SECRET)
    const buffer = Buffer.from(hash)
    const refreshToken = buffer.toString('base64')

    res.status(201).json({ accessToken: token, refreshToken })

  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}
