const usersService = require("../services/usersService")
const bcrypt = require("bcryptjs")

exports.validadeUserPassword = async (req, res, next) => {
  const user = await usersService.getUserByEmail(req.body.email)

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordCorrect) {
      req.body = {
        ...req.body,
        id: user.id || user._id
      }

      next()
    } else {
      res.status(400).json({ error: "Incorrect password" })
    }
  } else {
    res.status(404).json({ error: "User not found" })
  }
}