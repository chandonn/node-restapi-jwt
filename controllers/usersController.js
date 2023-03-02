const bcrypt = require("bcryptjs")
const usersService = require("../services/usersService")

exports.listUsers = async (req, res) => {
  try {
    const query = req.query

    if (query) {
      query.page = (parseInt(req.query.page) - 1) || 0
      query.page = Number.isInteger(query.page) ? query.page : 0
      query.limit = query.limit ? parseInt(query.limit) : 10
    } else {
      query.page = 0
      query.limit = 10
    }

    const users = await usersService.listUsers(query.page, query.limit)

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
    delete updated._id
    delete updated.__v
    delete updated.password

    res.status(200).json({ data: updated })
  } catch (e) {
    res.status(500).json({ error: "Internal error" })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const result = await usersService.deleteUser(req.params.id)
    res.status(200).json({ data: {}, status: "success" })
  } catch (e) {
    res.status(500).json({ error: "Internal error" })
  }
}
