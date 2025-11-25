const express = require("express")
const Router = express.Router()
const {registerUser, getUsers, loginUser} = require("../controllers/authController.js")

Router.post("/register", registerUser)
Router.post("/login", loginUser)
Router.get("/users", getUsers)

module.exports = Router