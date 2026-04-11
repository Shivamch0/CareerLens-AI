import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index : true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase : true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength : 6
    },
    avatar: {
      type: String,
    },
    interests: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    education: {
      degree: String,
      branch: String,
      marks: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password , 10)
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(

    {
      id: this._id,
      userName : this.userName,
      email : this.email,
      password : this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

userSchema.methods.generateRefreshToken = (req, res) => {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
