const CircularProgress = ({
  percentage = 52,
  size = 200,
  stroke = 15,
  color = "#2563EB",
  trackColor = "#E5E7EB",
  label = "Completed",
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const radius = size / 2;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={size} width={size} aria-hidden="true">
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
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
          {clampedPercentage}%
        </span>
        <span className="text-gray-500 text-sm">{label}</span>
      </div>
    </div>
  );
};

export default CircularProgress;
