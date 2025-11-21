import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        require : true, 
        unique : true,
    }, 
    email : {
        type : String, 
        require : true,
        lowercase : true
    },
    password : {
        type : String, 
        require : true
    }
}, {timestamps : true})

export const user = mongoose.model("user", userSchema)