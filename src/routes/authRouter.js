const express = require("express")
const Router = express.Router()
const {registerUser, getUsers} = require("../controllers/authController.js")

Router.post("/register", registerUser)
Router.get("/users", getUsers)

module.exports = Router