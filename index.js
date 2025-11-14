require('dotenv').config()
const express = require('express');
const app = express()

app.listen(process.env.PORT, ()=> {
    console.log(`✅ Server started at port ${process.env.PORT}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to My Learning Repository!');
})

app.get('/about', (req, res) =>{
    res.json({
        status : "success",
        name : "Learning Repository",
        version : "1.0.0",
        author : "Ankit Savaliya"
    })
})

app.get('/timetable', (req, res) =>{
    res.json({
        status : "success",
        timetable : {
            "14 Nov" : "IPDC",
            "17 Nov" : "PDS",
            "19 Nov" : "SE",
            "21 Nov" : "CN",
            "25 Nov" : "PE",
            "2 Dec" : "ADA",
        }
    })
})