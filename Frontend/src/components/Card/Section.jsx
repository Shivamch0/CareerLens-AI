import React from "react";

const Sections = ({ icon , content, number  , progress , progressColor}) => {
  return (
    <div className={`flex items-center gap-3 ml-4 p-4 rounded-2xl `}>
      <div className={` bg-gray-200 rounded-xl p-2`}>{icon}</div>
      <div>
        <div className="flex gap-5">
          <p>{content}</p>
          <p>{number}/5</p>
        </div>
        <div>progress</div>
      </div>
    </div>
  );
};

export default Sections;
