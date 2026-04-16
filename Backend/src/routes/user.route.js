import express from 'express'
import {verifyJWT} from "../middleware/auth.middleware.js"

// controller Imports
import { loginUser, registerUser } from "../controller/user.controller.js"

const router = express.Router()

router.route('/register').post(registerUser)

router.route("/login").post(verifyJWT , loginUser)

export default router