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
    <div className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className={`rounded-xl bg-gray-100 p-3 ${iconColor}`}>{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-gray-900">{content}</p>
          <p className="text-xs font-semibold text-gray-500">{number}/{total}</p>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
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
