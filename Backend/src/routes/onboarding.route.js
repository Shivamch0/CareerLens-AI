import express from 'express';

const router = express.Router();

router.route('/journey').post()
router.route('/interests').post()
router.route('/complete').post()
router.route('/status').post()

export default router