import { useState } from "react";
import QuestionCard from "./QuestionCard";

const Test = () => {
  const [currentQ, setCurrentQ] = useState(7);
  const [selected, setSelected] = useState(null);

  const questionData = {
    question: "Find the next number in the series:",
    series: "2, 6, 12, 20, ?",
    options: [
      { id: "A", text: "30" },
      { id: "B", text: "28" },
      { id: "C", text: "26" },
      { id: "D", text: "24" },
    ],
  };

  const tips = {
    text : " Read the Questions carefully and choose the best answer."
  }

  return (
    <section className="flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500">Question {currentQ}/25</p>
        </div>

        <div className="w-1/2 h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-blue-500 rounded-full w-[30%]" />
        </div>

        <p className="cursor-pointer">Report 🚩</p>
      </div>

      {/* Question Card */}
      <QuestionCard
        data={questionData}
        selected={selected}
        setSelected={setSelected}
      />

      {/* Tips */}
      <div className="mt-6 p-4 bg-gray-100 rounded-xl flex  gap-2">
        <p className="text-blue-500 font-semibold">💡Tips:</p>{tips.text}
      </div>
    </section>
  );
};

export default Test;
