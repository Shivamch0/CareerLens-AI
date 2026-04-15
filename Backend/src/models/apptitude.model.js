import mongoose from "mongoose"

const apptitudeSchema = new mongoose.model({

} , {timeStamps : true})

export const Apptitude = mongoose.model("Apptitude" , apptitudeSchema)