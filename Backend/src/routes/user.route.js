import express from 'express'
import {verifyJWT} from "../middleware/auth.middleware.js"

// controller Imports
import { loginUser, registerUser , logoutUser } from "../controller/user.controller.js"

const router = express.Router()

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT , logoutUser)

export default router