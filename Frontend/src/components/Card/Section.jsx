import { useTheme } from "../../Provider/ThemeProvider";

const Sections = ({
  icon,
  content,
  number,
  total,
  iconColor,
  progress,
  progressColor,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-2xl border p-4 shadow-sm ${
        isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
      }`}
    >
      <div className={`rounded-xl p-3 ${isDark ? "bg-white/10" : "bg-gray-100"} ${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {content}
          </p>
          <p className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-500"}`}>
            {number}/{total}
          </p>
        </div>
        <div className={`mt-3 h-2 w-full overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
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
