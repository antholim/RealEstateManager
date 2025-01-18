import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    phoneNumber: {
        type:String,
        required:false
    },
    dateOfBirth: {
        type:String,
        required:false
    }
}, { timestamps: true });

export const Tenant = mongoose.model('User', tenantSchema, "users");