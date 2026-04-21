import React from "react";
import Option from "../Other/Option";

const QuestionCard = ({ data, selected, setSelected }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-medium">{data.question}</h3>
      <h3 className="mb-4">{data.series}</h3>

      <div className="space-y-3">
        {data.options.map((opt) => (
          <Option
            key={opt.id}
            option={opt}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
