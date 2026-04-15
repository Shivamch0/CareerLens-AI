import mongoose from "mongoose"

const careerSchema = new mongoose.model({

} , {timeStamps : true})

export const Career = mongoose.model("Career" , careerSchema)