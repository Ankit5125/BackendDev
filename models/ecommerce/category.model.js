import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({

}, {timestamps : true})

export const categories = mongoose.model("categories", categorySchema)