import express from "express";
import multer from "multer";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  analyzeResume,
  getLatestResume,
  saveGeneratedResume,
  uploadResume,
} from "../controller/resume.controller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.use(verifyJWT);

router.route("/latest").get(getLatestResume);
router.route("/save").post(saveGeneratedResume);
router.route("/upload").post(upload.single("resume"), uploadResume);
router.route("/analyze").post(analyzeResume);

export default router;
