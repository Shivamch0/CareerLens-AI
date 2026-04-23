import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components Imports
import QuestionCard from "./QuestionCard";
import Button from "../Button/Button";

// Others Imports
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const Test = ({ type, timeLeft }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const data =
      type === "aptitude"
        ? [
            {
              id: 1,
              question: "Find the next number in the series:",
              series: "2, 6, 12, 20, ?",
              options: [
                { id: "A", text: "30" },
                { id: "B", text: "28" },
                { id: "C", text: "26" },
                { id: "D", text: "24" },
              ],
              correct: "A",
            },
            {
              id: 2,
              question: "5 + 7 = ?",
              options: [
                { id: "A", text: "10" },
                { id: "B", text: "12" },
                { id: "C", text: "13" },
                { id: "D", text: "11" },
              ],
              correct: "B",
            },
          ]
        : [
            {
              id: 1,
              question: "What type of work do you enjoy most?",
              options: [
                { id: "A", text: "Problem-solving" },
                { id: "B", text: "Creative designing" },
                { id: "C", text: "Helping people" },
                { id: "D", text: "Managing tasks" },
              ],
              correct: "A",
            },
          ];

    setQuestions(data);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    if (timeLeft !== undefined && timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const tips = {
    text: " Read the Questions carefully and choose the best answer.",
  };

  const handleSubmit = () => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    navigate("/aptitude/response", {
      state: {
        score,
        total: questions.length,
        answers,
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  const currentQuestion = questions[currentQ];

  return (
    <section className="flex-1 px-6">
      <div className="mb-1 p-4 bg-blue-100 rounded-xl flex  gap-2">
        <p className="text-blue-500 font-semibold">💡Tips:</p>
        {tips.text}
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Question {currentQ + 1}/{questions.length}
            </p>
          </div>

          <div className="w-1/2 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>

          <p className="cursor-pointer">Report 🚩</p>
        </div>

        <QuestionCard
          data={currentQuestion}
          selected={answers[currentQuestion.id]}
          setSelected={(id) => {
            setAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: id,
            }));
          }}
        />

        <div className="flex justify-between px-4 mt-2">
          <Button
            title="Previous"
            onClick={() => currentQ > 0 && setCurrentQ((prev) => prev - 1)}
            disabled={submitted || currentQ === 0}
            className={`py-2 shadow shadow-black/30 font-semibold flex items-center gap-3 flex-row-reverse`}
            icon={<FaLongArrowAltLeft />}
          />
          {currentQ === questions.length - 1 ? (
            <Button
              title="Submit"
              disabled={submitted || !answers[currentQuestion.id]}
              onClick={handleSubmit}
              className="py-2 bg-green-500 text-white font-semibold"
            />
          ) : (
            <Button
              title="Next"
              disabled={submitted || !answers[currentQuestion.id]}
              onClick={() =>
                currentQ < questions.length - 1 &&
                setCurrentQ((prev) => prev + 1)
              }
              className="py-2 bg-blue-400 text-white font-semibold"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Test;
