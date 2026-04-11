import express from 'express'
import {verifyJWT} from "../middleware/auth.middleware.js"

// controller Imports
import { registerUser } from "../controller/user.controller.js"

const router = express.Router()

router.route('/register').post(registerUser)

export default router