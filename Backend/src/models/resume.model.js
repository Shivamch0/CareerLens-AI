import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeFile: {
      type: String,
    },
    fileName: {
      type: String,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    extractedText: {
      type: String,
    },
    generatedResume: {
      name: String,
      title: String,
      email: String,
      phone: String,
      location: String,
      summary: String,
      skills: String,
      education: [
        {
          school: String,
          degree: String,
          year: String,
        },
      ],
      experience: [
        {
          role: String,
          company: String,
          duration: String,
          details: String,
        },
      ],
      projects: [
        {
          name: String,
          tech: String,
          details: String,
        },
      ],
    },
    analysis: {
      targetRole: String,
      score: Number,
      usedFallback: Boolean,
      groups: [
        {
          category: String,
          score: Number,
          suggestions: [
            {
              title: String,
              issue: String,
              improvement: String,
              priority: String,
            },
          ],
        },
      ],
      analyzedAt: Date,
    },
    extractedSkills: {
      type: [String],
    },
    educationDetails: {
      type: [String],
    },
    experience: {
      type: [String],
    },
  },
  { timestamps: true },
);

export const Resume = mongoose.model("Resume", resumeSchema);
