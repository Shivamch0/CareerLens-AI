import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true , 
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    avatar : {
        type : String
    },
    interests : {
        type : [String]
    },
    skills : {
        type : [String]
    },
    education : {
        degree : String,
        branch : String,
        marks : String
    },
    refreshToken : {
        type : String
    },
    
} , { timestamps : true});

export const User = mongoose.model("User" , userSchema)