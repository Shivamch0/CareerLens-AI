import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFlag, FaLightbulb, FaLongArrowAltLeft, FaRegClock } from "react-icons/fa";

import { submitAptitudeTest, submitInterestTest } from "../../api/test.api.js";
import { setUser } from "../../Redux State/Slice/authSlice.js";
import Button from "../Button/Button";
import QuestionCard from "./QuestionCard";

const Test = ({ type, timeLeft, questions = [] }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const aptitudeCompleted = user?.onboarding?.aptitudeTestCompleted;
  const interestCompleted = user?.onboarding?.interestTestCompleted;

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`${type}Answers`);
    const endTime = localStorage.getItem(`${type}EndTime`);

    if (savedAnswers && endTime && Number(endTime) > Date.now()) {
      setAnswers(JSON.parse(savedAnswers));
    } else {
      localStorage.removeItem(`${type}Answers`);
    }
  }, [type]);

  useEffect(() => {
    localStorage.setItem(`${type}Answers`, JSON.stringify(answers));
  }, [answers, type]);

  const buildAnswersPayload = useCallback(() => {
    return questions
      .filter((question) => answers[question.id] !== undefined)
      .map((question) => ({
        questionId: question.id,
        selectedOptionIndex: answers[question.id],
        category: question.category,
      }));
  }, [answers, questions]);

  const handleSubmit = useCallback(async () => {
    if (submitted) return;

    const answersPayload = buildAnswersPayload();

    if (answersPayload.length === 0) {
      setSubmitError("Please answer at least one question.");
      return;
    }

    try {
      setSubmitted(true);
      setSubmitError("");
      localStorage.setItem(`${type}Answers`, JSON.stringify(answers));

      if (type === "interest") {
        const response = await submitInterestTest({
          answers: answersPayload,
          questions,
        });

        if (response.data?.user) {
          dispatch(setUser(response.data.user));
        }

        localStorage.removeItem("Interest_Questions");
      } else if (type === "aptitude") {
        const response = await submitAptitudeTest({
          answers: answersPayload,
          questions,
        });

        if (response.data?.user) {
          dispatch(setUser(response.data.user));
        }

        localStorage.removeItem("Aptitude_Questions");
      }

      localStorage.removeItem(`${type}Answers`);
      localStorage.removeItem(
        `${type === "interest" ? "interest" : "aptitude"}EndTime`,
      );

      if (type === "interest" && !aptitudeCompleted) {
        navigate("../assessment");
      } else if (type === "aptitude" && !interestCompleted) {
        navigate("../assessment");
      } else {
        navigate("../progress");
      }
    } catch (error) {
      console.log(error);
      setSubmitted(false);
      setSubmitError(
        error?.response?.data?.message ||
          "Unable to submit your test. Please try again.",
      );
    }
  }, [
    answers,
    aptitudeCompleted,
    buildAnswersPayload,
    dispatch,
    interestCompleted,
    navigate,
    questions,
    submitted,
    type,
  ]);

  useEffect(() => {
    if (timeLeft === null || timeLeft === undefined || submitted) return;
    if (timeLeft <= 0 && Object.keys(answers).length > 0) {
      handleSubmit();
    }
  }, [answers, handleSubmit, submitted, timeLeft]);

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQ] || {};
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round(((currentQ + 1) / questions.length) * 100);
  const answeredProgress = Math.round((answeredCount / questions.length) * 100);
  const formattedType = type === "interest" ? "Interest Test" : "Aptitude Test";
  const tipText =
    type === "interest"
      ? "Choose the option that feels most like you. Honest answers create better recommendations."
      : "Work steadily and choose the best answer. You can move back to review previous questions.";

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) return "Loading";

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section className="flex-1 px-0 sm:px-4 lg:px-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              {formattedType}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Question {currentQ + 1} of {questions.length}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-blue-700">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                <FaRegClock /> Time left
              </div>
              <p className="mt-1 text-lg font-bold">{formatTime(timeLeft)}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3 text-gray-700">
              <p className="text-xs font-bold uppercase tracking-wide">
                Answered
              </p>
              <p className="mt-1 text-lg font-bold">
                {answeredCount}/{questions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>Current progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${answeredProgress}%` }}
              />
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50">
            <FaFlag className="text-amber-500" /> Report
          </button>
        </div>

        <div className="mb-5 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
          <FaLightbulb className="mt-1 shrink-0" />
          <p>{tipText}</p>
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

        <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:px-1">
          <Button
            title="Previous"
            onClick={() => currentQ > 0 && setCurrentQ((prev) => prev - 1)}
            disabled={submitted || currentQ === 0}
            className="flex items-center justify-center gap-3 py-3 font-semibold shadow-sm disabled:cursor-not-allowed disabled:opacity-50 sm:flex-row-reverse"
            icon={<FaLongArrowAltLeft />}
          />

          {currentQ === questions.length - 1 ? (
            <Button
              title={submitted ? "Submitting..." : "Submit"}
              disabled={submitted || answers[currentQuestion.id] === undefined}
              onClick={handleSubmit}
              className="bg-green-500 py-3 text-white font-semibold hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            />
          ) : (
            <Button
              title="Next"
              disabled={submitted || answers[currentQuestion.id] === undefined}
              onClick={() =>
                currentQ < questions.length - 1 &&
                setCurrentQ((prev) => prev + 1)
              }
              className="bg-blue-500 py-3 text-white font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            />
          )}
        </div>

        {submitError && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {submitError}
          </p>
        )}
      </div>
    </section>
  );
};

export default Test;
