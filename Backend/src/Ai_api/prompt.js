const interestPrompt = (interests) => `
Generate multiple-choice questions based on these interests: ${interests.join(", ")}.

Rules:
- For EACH interest, generate EXACTLY 3 questions and (do not include the other keyword in interests as Interests).
- Total questions = 3 × number of interests.
- Each question must belong to its respective interest category.
- Difficulty: beginner to intermediate.
- Each question must have exactly 4 options.
- Provide correctAnswer.
- Include "category" field (must match the interest).

Example:
If interests = ["technology", "business"]
→ total questions = 6 (3 per interest)

Return ONLY valid JSON array (no explanation, no text):

[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "category": "technology"
  }
]
`;

const aptitudePrompt = (careerStage) => `
    Generate 5 aptitude multiple-choice questions based on the user's career stage: "${careerStage}".

Difficulty rules:
- school → very basic (class 8–10 level)
- bachelors → moderate (logical reasoning + basic math)
- masters → advanced (analytical + problem solving)
- graduate → job-level aptitude (reasoning + quantitative)
- switcher → practical + logical + real-world scenarios

Requirements:
- Each question must have 4 options.
- Provide correctAnswer.
- Questions must match difficulty level.
- Keep language clear and simple.

Return ONLY JSON array (no explanation):

[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  }
]
`;

const careerRecommendationPrompt = (
  careerStage,
  education,
  interests,
  interestTest,
  aptitudeTest,
) => `
You are an intelligent AI career counselor and education advisor.

Analyze the complete user profile carefully and recommend the MOST suitable career or education paths.

USER PROFILE:

Career Stage:
${careerStage}

Education:
- Degree: ${education?.degree || "Not Provided"}
- Branch: ${education?.branch || "Not Provided"}
- Marks: ${education?.marks || "Not Provided"}

Selected Interests:
${interests?.join(", ") || "None"}

Interest Test Result:
- Dominant Interest: ${interestTest?.dominantInterest || "None"}

Interest Scores:
${JSON.stringify(interestTest?.scores || {}, null, 2)}

Aptitude Test:
- Score: ${aptitudeTest?.score || 0}
- Total Questions: ${aptitudeTest?.totalQuestions || 0}

IMPORTANT ANALYSIS RULES:

1. If user is in "school":
   - prioritize streams, subjects, entrance exams, colleges, and future education paths
   - THEN suggest suitable careers

2. If user is in "bachelors":
   - prioritize internships, certifications, higher studies, and career opportunities

3. If user is in "masters":
   - prioritize specialization, advanced careers, and research opportunities

4. If user is "graduate":
   - prioritize jobs, industry roles, and career growth opportunities

5. If user is "switcher":
   - prioritize career transition paths and transferable opportunities

6. Consider ALL interests dynamically.
Even custom interests like:
- animation
- gaming
- filmmaking
- sports
- music
- design
- content creation
etc.

7. Recommendations must be personalized using:
- interests
- aptitude performance
- education
- career stage

8. Recommend ONLY the TOP 3 to 5 most suitable options.

9. suitabilityPercentage must be realistic and different for every recommendation.

10. Higher aptitude score and stronger interest alignment should increase suitabilityPercentage.

11. Keep recommendations realistic and achievable.

12. DO NOT include markdown, explanations, or extra text outside JSON.

RETURN FORMAT:

[
  {
    "title": "AI Engineer",
    "type": "career",
    "suitabilityPercentage": 87,
    "reason": "Your strong technology interest and analytical aptitude indicate high potential for AI-related careers.",
    "roadmap": [
      "Learn Python",
      "Study Machine Learning",
      "Build AI projects",
      "Apply for internships"
    ]
  },
  {
    "title": "B.Tech in Computer Science",
    "type": "education",
    "suitabilityPercentage": 82,
    "reason": "Your strong logical aptitude and technology-oriented interests make Computer Science a suitable education path.",
    "roadmap": [
      "Prepare for entrance exams",
      "Improve mathematics fundamentals",
      "Explore programming basics"
    ]
  }
]

Return ONLY raw valid JSON array.
`;

export { interestPrompt, aptitudePrompt, careerRecommendationPrompt };
