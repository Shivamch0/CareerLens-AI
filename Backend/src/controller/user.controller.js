import { User } from "../models/user.model.js"

// Utils Imports
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const registerUser = asyncHandler ( async (req , res) => {
    const {userName , email , password} = req.body;
    if(!userName || !email || !password ){
        throw new ApiError(400 , 'Fill all the fields...')
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        throw new ApiError(400 , 'User already registered with this email...')
    }

    const user = await User.create({
        userName,
        email : email.toLowerCase(),
        password
    })

    const accessToken = await User.generateAccessToken()
    const refreshToken = await User.generateRefreshToken()

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(400 , 'Something went wrong while registering user')
    }

    const options = {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        smaeSite :"None" ,
        path : "/",
        maxAge : "7 * 24 * 60 * 60 * 1000"
    }

    return res.status(200)
            .cookie("AccessToken" , options , accessToken)
            .cookie('RefreshToken' , options , refreshToken)
            .json(
                new ApiResponse(200 , createdUser , "User Created Successfully")
            )

});

const loginUser = asyncHandler ( async (req , res) => {

});

const logoutUser = asyncHandler ( async (req , res) => {

});

const getCurrentUser = asyncHandler ( async (req , res) => {

});

const refreshToken = asyncHandler ( async (req , res) => {

});

export { registerUser , loginUser , logoutUser , getCurrentUser , refreshToken}