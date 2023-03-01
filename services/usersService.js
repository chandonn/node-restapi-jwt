const userModel = require("../models/usersModel")

exports.createUser = async (user) => {
  return await userModel.create(user)
}

exports.getUser = async (id) => {
  const user = await userModel.findById(id)
  return user.toJSON()
}

exports.updateUser = async (id, user) => {
  const updated = await userModel.findByIdAndUpdate(id, user)
  return updated.toJSON()
}

exports.deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id)
}

exports.listUsers = async () => {
  return await userModel.find()
}
