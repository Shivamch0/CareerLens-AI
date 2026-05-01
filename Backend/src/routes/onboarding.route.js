import express from 'express';
import { saveJourney , saveInterests , completeOnboarding  , getOnboardingStatus } from '../controller/onboarding.controller';

const router = express.Router();

router.route('/journey').post(saveJourney);

router.route('/interests').post(saveInterests);

router.route('/complete').post(completeOnboarding);

router.route('/status').get(getOnboardingStatus)

export default router