import React from "react";
import Option from "../Other/Option";

const QuestionCard = ({ data, selected, setSelected }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-medium">{data.question}</h3>

      <div className="space-y-3">
        {data.options?.map((opt , index) => (
          <Option
            key={index}
            option={opt}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
