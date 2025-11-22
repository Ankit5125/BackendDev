import mongoose from "mongoose"

const subTodoSchema = new mongoose.Schema({
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
        ref : "user"
    }
}, {timestamps : true});

export const subTodo = mongoose.model("subTodo", subTodoSchema)