import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        required : true,
        lowercase : true
    }, 
    number : {
        type : String,
        required : true,
        unique : true        
    },
    refreshToken : {
        type : String, 
        required : false
    },
    isActive : {
        type : Boolean, 
        default : false
    }
}, {timestamps : true})

export default mongoose.model("userModel", userSchema)