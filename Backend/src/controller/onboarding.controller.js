import { User } from '../models/user.model.js'

// Utils Imports
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'

const saveJourney = asyncHandler (async (req , res) => {

});

const saveInterests = asyncHandler ( async (req , res) => {

});

const completeOnboarding = asyncHandler ( async ( req , res) => {

});

const getOnboardingStatus = asyncHandler (async (req , res) => {

});

export { saveJourney , saveInterests , completeOnboarding , getOnboardingStatus}