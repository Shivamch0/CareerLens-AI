export const resumeAnalysisPrompt = (resumeText, targetRole = "") => `
Analyze this resume for the target role: ${targetRole || "Not specified"}.

Return ONLY a valid JSON array. Do not use markdown.

Schema:
[
  {
    "category": "Content",
    "score": 0-100,
    "suggestions": [
      {
        "title": "Short title",
        "issue": "What is weak or missing",
        "improvement": "Specific rewrite or action",
        "priority": "High | Medium | Low"
      }
    ]
  }
]

Required categories:
- Content
- ATS
- Skills
- Impact
- Formatting

Rules:
- Give practical suggestions the user can apply immediately.
- Mention missing measurable outcomes when bullets lack numbers.
- Mention missing target-role keywords when relevant.
- Keep each category to 2-4 suggestions.
- Scores must be realistic.

Resume:
${resumeText}
`;
