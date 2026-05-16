import { useTheme } from "../../Provider/ThemeProvider";

const AptitudeCard = ({
  image,
  title,
  para,
  question,
  minute,
  progress = 40,
  style,
  bgColor,
  progressColor,
  fn,
  completed = false,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-70 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center cursor-pointer transition hover:shadow-md border ${style ? style : ""}`}
      onClick={fn}
    >
      <div className="mb-3 flex w-full justify-end">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            completed
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {completed ? "Done" : "Pending"}
        </span>
      </div>

      <div
        className={`w-30 h-30 rounded-full flex items-center justify-center mb-4 ${bgColor}`}
      >
        <img src={image} alt="card-icon" className="mt-3" />
      </div>

      <h3
        className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"} `}
      >
        {title}
      </h3>

      <p className={`text-sm text-gray-500 mt-2 leading-relaxed`}>{para}</p>

      <div
        className={`flex gap-2 mt-4 text-sm font-medium ${isDark ? "text-white" : "text-gray-600"}`}
      >
        <span>{question} Questions</span>
        <span>|</span>
        <span>{minute} Min</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-full ${progressColor} rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default AptitudeCard;
