import express from "express";
import multer from "multer";
import path from "path";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  analyzeResume,
  getLatestResume,
  saveGeneratedResume,
  uploadResume,
} from "../controller/resume.controller.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

const allowedResumeTypes = new Set([
  ".pdf",
  ".docx",
  ".txt",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedResumeTypes.has(ext)) {
      cb(null, true);
      return;
    }

    cb(new ApiError(400, "Only PDF, DOCX, and TXT resume files are supported..."));
  },
});

router.use(verifyJWT);

router.route("/latest").get(getLatestResume);
router.route("/save").post(saveGeneratedResume);
router.route("/upload").post(upload.single("resume"), uploadResume);
router.route("/analyze").post(analyzeResume);

export default router;
