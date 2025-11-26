const express = require("express");
const { user } = require('./src/models/todos/user.model.js');
require('dotenv').config()
const userRoutes = require("./src/routes/authRouter.js")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to My Learning Repository!');
});

app.get('/about', (req, res) => {
    res.json({
        status: "success",
        name: "Learning Repository",
        version: "1.0.0",
        author: "Ankit Savaliya"
    });
});

app.use("/api/auth", userRoutes)

module.exports = app;