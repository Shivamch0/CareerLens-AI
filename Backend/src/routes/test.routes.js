import express from 'express';
import { generateAptitudeQuestions , generateInterestQuestions , submitAptitudeTest , submitInterestTest , getCareerRecommendations } from '../controller/test.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = express.Router();

router.route('/interest-questions').get(verifyJWT , generateInterestQuestions);

router.route('/aptitude-questions').get(verifyJWT , generateAptitudeQuestions);

router.route('/interest-submit').post(verifyJWT , submitInterestTest);

router.route('/aptitude-submit').post(verifyJWT , submitAptitudeTest);

router.route('/career-recommendations').get(verifyJWT , getCareerRecommendations);

export default router;
