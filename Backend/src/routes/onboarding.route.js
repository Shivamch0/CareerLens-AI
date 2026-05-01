import express from 'express';
import { saveJourney , saveInterests , saveSkills , completeOnboarding  , getOnboardingStatus } from '../controller/onboarding.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT)

router.route('/journey').post(saveJourney);

router.route('/interests').post(saveInterests);

router.route('/skills').post(saveSkills);

router.route('/complete').post(completeOnboarding);

router.route('/status').get(getOnboardingStatus)

export default router