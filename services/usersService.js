const userModel = require("../models/usersModel")

exports.createUser = async (user) => {
  return await userModel.create(user)
}

exports.getUser = async (id) => {
  const user = await userModel.findById(id)
  return user.toJSON()
}

exports.getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email })
  return user
}

exports.updateUser = async (id, user) => {
  const updated = await userModel.findByIdAndUpdate(id, user)
  return updated.toJSON()
}

exports.deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id)
}

exports.listUsers = async (page, limit) => {
  const query = userModel.find().limit(limit).skip(page * limit)
  const users = (await query).map(i => {
    const r = { ...i.toJSON(), password: undefined, __v: undefined }
    return r
  })
  
  return users
}
