import React from "react";

const Option = ({ option , index , selected , setSelected }) => {
  const isSelected = selected === index;
  return (
    <div
      onClick={() => setSelected(index)}
      className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition  ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
    >
      <div className="flex gap-3">
        <span>{index + 1}</span>
        <p>{option}</p>
      </div>
      <div
        className={`w-4 h-4 rounded-full border
        ${isSelected ? "bg-blue-500 border-blue-500" : "border-gray-400"}
      `}
      />
    </div>
  );
};

export default Option;
