import React from "react";

const CircularProgress = ({ percentage = 52 }) => {
  const radius = 100;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#22C55E"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: "rotare(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.5s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

      </svg>

      <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-semibold text-gray-800">
            {percentage}%
          </span>
          <span className="text-gray-500 text-sm">Completed</span>
        </div>
    </div>
  );
};

export default CircularProgress;
