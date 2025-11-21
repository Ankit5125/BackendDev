import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    }, 
    isCompleted : {
        type : Boolean, 
        default : false
    }, 
    createdBy : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "user",
        required : true
    }, 
    subTodos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "subTodo"
        }
    ]
}, {timestamps : true})

export const todo = mongoose.model("todo", todoSchema)