const bcrypt = require("bcryptjs")
const usersService = require("../services/usersService")

exports.listUsers = async (_, res) => {
  try {
    const users = await usersService.listUsers()
    res.status(200).json({ data: users })
  } catch (e) {
    res.status(500).json({ error: "Internal error" })
  }
}

exports.createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)

    req.body.password = hash
    req.body.permissionLevel = 1

    const user = await usersService.createUser(req.body)

    res.status(200).json({ data: user })
  } catch(e) {
    res.status(500).json({ error: "Internal error" })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await usersService.getUser(req.params.id)
    delete user._id
    delete user.__v
    delete user.password
    res.status(200).json({ data: user })
  } catch (e) {
    res.status(500).json({ error: "Internal error" })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    req.body.password = hash

    const updated = await usersService.updateUser(req.params.id, req.body)
    res.status(200).json({ data: updated })
  } catch (e) {
    res.status(500).json({ error: "Internal error" })
  }
}

exports.deleteUser = async (req, res) => {
  try {

  } catch (e) {
    res.status(500).json({ error: "Internal error" })
  }
}
