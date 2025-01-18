import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
        required:true
    },
    dateOfBirth: {
        type:String,
        required:true
    },
    has2FA: {
        type: Boolean,
        default: false
    },
    subscriptionType : {
        type: String,
        enum: ["Free", "Premium"],
        default: "Free",
    },
    apartments:[
        
    ]

}, { timestamps: true });

export const User = mongoose.model('User', userSchema, "users");