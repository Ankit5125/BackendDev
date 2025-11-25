const express = require("express");
const { user } = require('./src/models/todos/user.model.js');
require('dotenv').config()
const userRoutes = require("./src/routes/authRouter.js")

const app = express();
app.use(express.json());

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

app.get('/timetable', (req, res) => {
    res.json({
        status: "success",
        timetable: {
            "14 Nov": "IPDC",
            "17 Nov": "PDS",
            "19 Nov": "SE",
            "21 Nov": "CN",
            "25 Nov": "PE",
            "2 Dec": "ADA",
        }
    });
});

app.post("/addUser", async (req, res) => {
    let { username, password, email, number } = req.body;
    const newUser = new user({ username, email, number, password });

    try {
        const response = await newUser.save();
        res.send("Status : " + response);
    } catch (err) {
        res.send('Error saving document: ' + err);
    }
});

app.use("/api/auth", userRoutes)

module.exports = app;