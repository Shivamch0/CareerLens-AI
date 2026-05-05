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

export { interestPrompt , aptitudePrompt}