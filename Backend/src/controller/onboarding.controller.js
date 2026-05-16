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
        { $set : {
            careerStage,
            "onboarding.journeyCompleted" : true,
        }},
        {returnDocument : "after"}
    ).select("-password")

    if(!user){
        throw new ApiError(401 , "Something went wrong while saving the career")
    }

    return res.status(200)
            .json(new ApiResponse(200 , user , "Career stage saved successfully..."))

});

const saveInterests = asyncHandler ( async (req , res) => {
    let { interests , otherInterests } = req.body;
    if(!Array.isArray(interests)){
        interests = []
    }

    const selectedInterests = interests
        .filter((interest) => typeof interest === "string")
        .map((interest) => interest.trim())
        .filter((interest) => interest && interest.toLowerCase() !== "others");

    const customInterests = typeof otherInterests === "string"
        ? otherInterests
            .split(",")
            .map((interest) => interest.trim())
            .filter(Boolean)
        : [];

    const uniqueInterests = [
        ...new Map(
            [...selectedInterests, ...customInterests].map((interest) => [
                interest.toLowerCase(),
                interest,
            ]),
        ).values(),
    ];

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$set : {interests : uniqueInterests , "onboarding.interestsCompleted" : true}},
        {returnDocument : "after"}
    ).select("-password")

    return res.status(200)
            .json(new ApiResponse(200 , user , "Interests save successfully..."))

});

const saveSkills = asyncHandler( async (req , res) => {
    const { skills } = req.body;
    if(!skills || !Array.isArray(skills)){
        throw new ApiError(400 , "Skills must be an array...")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$set : {skills}},
        {returnDocument : "after"}
    ).select("-password")

    return res.status(200)
            .json(new ApiResponse(200 , user , "Skills saved successfully..."))
})

// After all the tests completed
const completeOnboarding = asyncHandler ( async ( req , res) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$set : {onboardingCompleted : true}},
        {returnDocument : "after"}
    ).select("-password")

    return res.status(200)
            .json(new ApiResponse(200 , user , "Onboarding completed successfully..."))
});

const getOnboardingStatus = asyncHandler (async (req , res) => {
    const user = await User.findById(req.user._id).select(
        "careerStage , interests , skills , onboardingCompleted"
    )

    return res.status(200)
            .json(new ApiResponse(200 , user , "Onboarding status fetched successfully..."))
});

export { saveJourney , saveInterests , saveSkills , completeOnboarding , getOnboardingStatus}
