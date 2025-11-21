const mongoose = require('mongoose');
const express = require('express');
const { user } = require('./models/todos/user.model');
const app = express()
app.use(express.json());

require('dotenv').config()

app.listen(process.env.PORT, async () => {
    await mongoose.connect(`${process.env.DBURL}`).then((response) =>{
        console.log("❓Mongoose Connection Status : " + mongoose.connection.readyState)
    })
    console.log(`✅ Server started at port ${process.env.PORT}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to My Learning Repository!');
})

app.get('/about', (req, res) => {
    res.json({
        status: "success",
        name: "Learning Repository",
        version: "1.0.0",
        author: "Ankit Savaliya"
    })
})

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
    })
})

app.post("/addUser", async (req, res) => {
   let { username, password, email, number, isActive } = req.body;
    const newUser = new user({
            username: username,
            email: email,
            number: number,
            password: password
    })
    console.log({
        username: username,
            email: email,
            number: number,
            password: password
    })
    try {
        await newUser.save().then(
            response => {
                res.send("Status : "+ response)
            }
        ).catch(err => {
            res.send('Error saving document: '+ err);
        })
    }
    catch (err) {
        res.send('Error Building Connection : '+ err);
    }
})