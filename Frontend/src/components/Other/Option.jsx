import { useTheme } from "../../Provider/ThemeProvider";

const Option = ({ option , index , selected , setSelected }) => {
  const { isDark } = useTheme();
  const isSelected = selected === index;
  const optionLabel = String.fromCharCode(65 + index);

  return (
    <button
      type="button"
      onClick={() => setSelected(index)}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
        isSelected
          ? isDark
            ? "border-blue-400 bg-blue-500/15 shadow-sm"
            : "border-blue-500 bg-blue-50 shadow-sm"
          : isDark
            ? "border-white/10 bg-white/5 hover:border-blue-400/60 hover:bg-white/10"
            : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
            isSelected
              ? "bg-blue-600 text-white"
              : isDark
                ? "bg-white/10 text-gray-200"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {optionLabel}
        </span>
        <p
          className={`text-sm font-semibold leading-5 sm:text-base ${
            isDark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          {option}
        </p>
      </div>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          isSelected
            ? "border-blue-600 bg-blue-600"
            : isDark
              ? "border-gray-500"
              : "border-gray-300"
        }`}
      >
        {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
};

export default Option;
