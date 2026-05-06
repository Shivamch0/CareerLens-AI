import express from 'express';
import { generateAptitudeQuestions , generateInterestQuestions , submitAptitudeTest , submitInterestTest , getCareerRecommendations } from '../controller/test.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js"

const route = express.Router();


export default route;

