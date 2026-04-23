import React from "react";

const Sections = ({
  icon,
  content,
  number,
  total,
  iconColor,
  progress,
  progressColor,
}) => {
  return (
    <div className={`flex items-center gap-3 ml-4 p-4 rounded-2xl w-full bg-white shadow-sm`}>
      <div className={` bg-gray-200 rounded-xl p-2 ${iconColor}`}>{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="font-medium">{content}</p>
          <p className="text-sm text-gray-500">{number}/{total}</p>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div
            className={`h-full ${progressColor} rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sections;
