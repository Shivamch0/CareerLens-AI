import React from "react";

function HomeCard({ title, content, icon }) {
  return (
    <div className="relative rounded-3xl p-[1.5px]">
      <div
        className="absolute inset-0 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.6)] border border-purple-400/40"
      ></div>

      <div
        className=" flex gap-5 items-center relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 text-white"
      >
        <div className="text-4xl text-blue-400 ">{icon}</div>

        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-bold">{title}</h4>
          <p className="text-sm text-gray-500">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
