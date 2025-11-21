import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({

}, {
    timestamps : true
})

export const record = mongoose.model("record", medicalRecordSchema)