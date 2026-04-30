import express from 'express'
import {verifyJWT} from "../middleware/auth.middleware.js"

// controller Imports
import { loginUser, registerUser , logoutUser , refreshAccessToken } from "../controller/user.controller.js"

const router = express.Router()

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT , logoutUser);

router.route("/refresh-token").post(refreshAccessToken)

export default router