import { User } from '../models/user.model.js'

// Utils Imports
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'

const saveJourney = asyncHandler (async (req , res) => {
    const { careerStage } = req.body;
    if(!careerStage){
        throw new ApiError(401 , "Career Stage is required...")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set : {careerStage}},
        {new : true}
    ).select("-password")

    if(!user){
        throw new ApiError(401 , "Something went wrong while saving the career")
    }

    return res.status(200)
            .json(200 , user , "Career stage saved successfully...")

});

const saveInterests = asyncHandler ( async (req , res) => {
    const {interests} = req.body;
    if(!interests || !Array.isArray(interests)){
        throw new ApiError(400 , "At least one interests required...")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$set : {interests}},
        {new : true}
    ).select("-password")

    return res.status(200)
            .json(200 , user , "Interests save successfully...")

});

const completeOnboarding = asyncHandler ( async ( req , res) => {

});

const getOnboardingStatus = asyncHandler (async (req , res) => {

});

export { saveJourney , saveInterests , completeOnboarding , getOnboardingStatus}