const express = require("express")
const Router = express.Router()
const {registerUser, getUsers, loginUser, changePassword} = require("../controllers/authController.js")

Router.post("/register", registerUser)
Router.post("/login", loginUser)
Router.get("/users", getUsers)
Router.post("/changePassword", changePassword)

module.exports = Router