const interestPrompt = (interests) => `
Generate multiple-choice questions based on these interests: ${interests.join(", ")}.

Rules:
- For EACH interest, generate EXACTLY 3 questions.
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

const careerRecommendationPrompt = `
You are an intelligent AI career counselor.

Analyze the user profile carefully and recommend the BEST career paths or education paths.

USER PROFILE:

Career Stage: ${careerStage}

Education:
- Degree: ${education?.degree || "Not Provided"}
- Branch: ${education?.branch || "Not Provided"}
- Marks: ${education?.marks || "Not Provided"}

Selected Interests:
${interests?.join(", ") || "None"}


Interest Test Result:
- Dominant Interest: ${interestTest?.dominantInterest || "None"}

Interest Scores:
${JSON.stringify(Object.fromEntries(interestTest?.scores || []), null, 2)}

Aptitude Test:
- Score: ${aptitudeTest?.score || 0}
- Total Questions: ${aptitudeTest?.totalQuestions || 0}

IMPORTANT RULES:

1. If user is in "school":
   - prioritize streams, subjects, colleges, entrance exams, and future paths
   - THEN suggest careers

2. If user is in "bachelors":
   - prioritize internships, skills, certifications, higher studies, and careers

3. If user is in "masters":
   - prioritize specialization, research, advanced careers

4. If user is "graduate":
   - prioritize jobs, career roles, industry paths

5. If user is "switcher":
   - prioritize transition roadmap and transferable careers

6. Consider ALL interests dynamically.
Even custom interests like:
- animation
- music
- sports
- gaming
- filmmaking
etc.

7. Recommendations must be personalized based on:
- interests
- aptitude
- education
- skills
- career stage

Return ONLY valid JSON array.

FORMAT:

[
  {
    "title": "Software Developer",
    "type": "career",
    "reason": "Strong technology interest and good aptitude in logical reasoning.",
    "roadmap": [
      "Learn JavaScript",
      "Build projects",
      "Apply for internships"
    ]
  }
]

`;

export { interestPrompt , aptitudePrompt , careerRecommendationPrompt}