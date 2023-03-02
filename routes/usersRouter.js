const express = require("express")
const usersController = require("../controllers/usersController")
const authController = require("../controllers/authController")
const usersMiddleware = require("../middlewares/usersMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

router.route("/users")
  .get(usersController.listUsers)
  .post(usersController.createUser)
router.route("/users/:id")
  .get(authMiddleware.usesAuthToken, usersController.getUser)
  .patch(authMiddleware.usesAuthToken, usersController.updateUser)
  .delete(authMiddleware.usesAuthToken, usersController.deleteUser)
router.route("/auth")
  .post(usersMiddleware.validadeUserPassword, authController.login)

module.exports = router
