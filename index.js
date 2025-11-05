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