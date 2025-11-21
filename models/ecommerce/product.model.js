import mongoose, { mongo, Types } from "mongoose"

const productSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
    }, 
    description : {
        type : String, 
        required : true
    }, 
    productImage : {
        type : String, 
    }, 
    price :{
        type : Number, 
        default : -1
    }, 
    stock : {
        type : Number, 
        default : 0, 
    }, 
    category : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "categories", 
        required : true
    }, 
    owner : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "user"
    }
}, {timestamps : true})

export const product = mongoose.model("product", productSchema)