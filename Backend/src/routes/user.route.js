import express from 'express'
import {verifyJWT} from "../middleware/auth.middleware.js"

// controller Imports
import { loginUser, registerUser , logoutUser , getCurrentUser , refreshAccessToken , changeCurrentPassword , updateAccountDetails } from "../controller/user.controller.js"

const router = express.Router()

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT , logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/current-user").get(verifyJWT , getCurrentUser);

router.route("/changeCurrentPassword").put(changeCurrentPassword);

router.route("/updateDetails").put(updateAccountDetails);

export default router