const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
})

module.exports = mongoose.model("Users", userSchema)
