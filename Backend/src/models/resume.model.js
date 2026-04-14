import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User"
    },
    resume : {

    },
    extractedSkills : {

    },
    educationDetails : {

    },
    experience : {

    },
    uploadDate : {

    }
}, { timestamps : true})

export const Resume = mongoose.model("Resume" , resumeSchema);