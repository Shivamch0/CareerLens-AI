import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components Imports
import QuestionCard from "./QuestionCard";
import Button from "../Button/Button";

// Others Imports
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const Test = ({ type, timeLeft, questions , options }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const tips = "Tips"

  useEffect(() => {
    if (!submitted && timeLeft !== undefined && timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const currentQuestion = questions[currentQ] || {};

  const handleSubmit = () => {

    localStorage.setItem(
      `${type}Answers`,
      JSON.stringify(answers)
    );

    // navigate("/progress");
  };


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
            disabled={submitted || answers[currentQuestion.id] === undefined}
            onClick={handleSubmit}
            className="py-2 bg-green-500 text-white font-semibold"
          />
        ) : (
          <Button
            title="Next"
            disabled={submitted || answers[currentQuestion.id] === undefined}
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
