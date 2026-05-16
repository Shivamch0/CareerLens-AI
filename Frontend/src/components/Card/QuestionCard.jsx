import Option from "../Other/Option";
import { useTheme } from "../../Provider/ThemeProvider";

const QuestionCard = ({ data, selected, setSelected }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm sm:p-7 ${
        isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
      }`}
    >
      <div className="mb-5">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
          Question
        </p>
        <h3
          className={`text-lg font-bold leading-7 sm:text-xl ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {data.question}
        </h3>
      </div>

      <div className="space-y-3">
        {data.options?.map((opt , index) => (
          <Option
            key={index}
            option={opt}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
