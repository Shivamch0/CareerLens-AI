import React from "react";

const Option = ({ option , selected , setSelected }) => {
  const isSelected = selected === option.id;
  return (
    <div
      onClick={() => setSelected(option.id)}
      className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition  ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
    >
      <div className="flex gap-3">
        <span>{option.id}</span>
        <p>{option.text}</p>
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
