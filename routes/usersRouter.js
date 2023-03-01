const express = require("express")
const usersController = require("../controllers/usersController")
const router = express.Router()

router.route("/users").get(usersController.listUsers).post(usersController.createUser)
router.route("/users/:id").get(usersController.getUser).patch(usersController.updateUser)

module.exports = router
