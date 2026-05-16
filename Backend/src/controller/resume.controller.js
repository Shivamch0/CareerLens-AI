import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

import { Resume } from "../models/resume.model.js";
import { generateResponse } from "../Ai_api/ai.js";
import { parseAIResponse } from "../Ai_api/parser.js";
import { resumeAnalysisPrompt } from "../Ai_api/resumePrompt.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getLatestResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ userId: req.user._id }).sort({
    updatedAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, resume, "Latest resume fetched successfully"));
});

const saveGeneratedResume = asyncHandler(async (req, res) => {
  const { generatedResume } = req.body;

  if (!generatedResume || typeof generatedResume !== "object") {
    throw new ApiError(400, "Generated resume data is required...");
  }

  const resumeText = buildResumeText(generatedResume);

  const resume = await Resume.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: {
        generatedResume,
        extractedText: resumeText,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, resume, "Resume saved successfully"));
});

const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Resume file is required...");
  }

  const extractedText = await extractTextFromFile(req.file);

  const resume = await Resume.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: {
        resumeFile: req.file.originalname,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        extractedText,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        resume,
        extractedText,
      },
      "Resume uploaded and parsed successfully",
    ),
  );
});

const analyzeResume = asyncHandler(async (req, res) => {
  const { resumeText, targetRole = "" } = req.body;
  const normalizedTargetRole = typeof targetRole === "string" ? targetRole.trim() : "";

  if (!resumeText || typeof resumeText !== "string") {
    throw new ApiError(400, "Resume text is required...");
  }

  let groups;
  let usedFallback = false;

  const aiResponse = await generateResponse(
    resumeAnalysisPrompt(resumeText.slice(0, 12000), normalizedTargetRole),
  );

  if (aiResponse.success) {
    try {
      groups = parseAIResponse(aiResponse.data);
    } catch {
      groups = buildRuleBasedAnalysis(resumeText, normalizedTargetRole).groups;
      usedFallback = true;
    }
  } else {
    groups = buildRuleBasedAnalysis(resumeText, normalizedTargetRole).groups;
    usedFallback = true;
  }

  const score = calculateScore(groups);

  const resume = await Resume.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: {
        extractedText: resumeText,
        analysis: {
          targetRole: normalizedTargetRole,
          score,
          usedFallback,
          groups,
          analyzedAt: new Date(),
        },
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        score,
        targetRole: normalizedTargetRole,
        groups,
        resume,
        usedFallback,
      },
      "Resume analyzed successfully",
    ),
  );
});

const extractTextFromFile = async (file) => {
  const fileName = file.originalname.toLowerCase();

  if (file.mimetype === "text/plain" || fileName.endsWith(".txt")) {
    return file.buffer.toString("utf8");
  }

  if (file.mimetype === "application/pdf" || fileName.endsWith(".pdf")) {
    const parser = new PDFParse({ data: file.buffer });
    const data = await parser.getText();
    await parser.destroy();
    return data.text;
  }

  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const data = await mammoth.extractRawText({ buffer: file.buffer });
    return data.value;
  }

  throw new ApiError(400, "Only TXT, PDF, and DOCX files are supported...");
};

const buildResumeText = (resume) => {
  const lines = [
    resume.name,
    resume.title,
    [resume.email, resume.phone, resume.location].filter(Boolean).join(" | "),
    "",
    resume.summary && "SUMMARY",
    resume.summary,
    "",
    resume.skills && "SKILLS",
    resume.skills,
    "",
    "EXPERIENCE",
    ...(resume.experience || []).flatMap((item) =>
      [
        item.role || item.company ? `${item.role || ""} - ${item.company || ""}` : "",
        item.duration,
        item.details,
        "",
      ].filter(Boolean),
    ),
    "PROJECTS",
    ...(resume.projects || []).flatMap((item) =>
      [item.name, item.tech, item.details, ""].filter(Boolean),
    ),
    "EDUCATION",
    ...(resume.education || []).flatMap((item) =>
      [[item.degree, item.school, item.year].filter(Boolean).join(" | "), ""].filter(Boolean),
    ),
  ];

  return lines.filter((line, index) => line || lines[index - 1]).join("\n").trim();
};

const buildRuleBasedAnalysis = (text, targetRole = "") => {
  const lower = text.toLowerCase();
  const targetWords = targetRole
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 3);
  const targetMatches = targetWords.filter((word) => lower.includes(word));

  return {
    groups: [
      {
        category: "Content",
        score: lower.includes("summary") ? 80 : 45,
        suggestions: [
          {
            title: "Sharpen the summary",
            issue: "The resume needs a clear opening pitch for the target role.",
            improvement:
              "Add 2-3 lines naming your role, strongest skills, and career focus.",
            priority: "High",
          },
        ],
      },
      {
        category: "ATS",
        score: targetWords.length && targetMatches.length < 2 ? 45 : 75,
        suggestions: [
          {
            title: "Add target keywords",
            issue: "ATS systems look for role-specific terms.",
            improvement:
              "Mirror important keywords from the job description in skills and experience.",
            priority: "High",
          },
        ],
      },
      {
        category: "Skills",
        score: lower.includes("skills") ? 80 : 40,
        suggestions: [
          {
            title: "Create a skills section",
            issue: "Skills are hard to scan if they are buried in paragraphs.",
            improvement:
              "Group technical, tools, and soft skills in a dedicated skills section.",
            priority: "Medium",
          },
        ],
      },
      {
        category: "Impact",
        score: /\b\d+%|\b\d+\+|\b\d+x|\b\d+ users/i.test(text) ? 85 : 35,
        suggestions: [
          {
            title: "Quantify achievements",
            issue: "Bullets without numbers are less persuasive.",
            improvement:
              "Add metrics like percentage improvements, project counts, users, or time saved.",
            priority: "High",
          },
        ],
      },
      {
        category: "Formatting",
        score: text.split(/\s+/).length <= 750 ? 80 : 50,
        suggestions: [
          {
            title: "Keep it concise",
            issue: "Long resumes become harder to scan.",
            improvement:
              "Keep sections short, use bullets, and prioritize the most relevant work.",
            priority: "Medium",
          },
        ],
      },
    ],
  };
};

const calculateScore = (groups = []) => {
  if (!groups.length) return 0;

  const total = groups.reduce((sum, group) => sum + Number(group.score || 0), 0);
  return Math.round(total / groups.length);
};

export { getLatestResume, saveGeneratedResume, uploadResume, analyzeResume };
