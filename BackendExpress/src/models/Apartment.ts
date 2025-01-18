import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
    address: {
        type: String,
        required: false,
        unique: true
    },
    city: {
        type:String,
        required:true
    },
    postalCode: {
        type:String,
        required:true
    },
}, { timestamps: true });

export const Apartment = mongoose.model('User', apartmentSchema, "users");