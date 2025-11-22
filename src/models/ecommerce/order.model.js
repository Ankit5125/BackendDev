import mongoose  from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "product"
    }, 
    quantity : {
        type : Number, 
        required : true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice : {
        type : Number, 
        required : true
    }, 
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user" 
    }, 
    items : {
        type : [orderItemSchema], 
        required : true
    }, 
    address : {
        type : String, 
        required : true
    }, 
    status : {
        type : String, 
        enum : ["Pending", "Cancelled", "Delivered", "On the Way"], 
        default : "Pending"
    }
}, {timestamps : true})

export const order = mongoose.model("order", orderSchema)