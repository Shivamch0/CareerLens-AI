import { useTheme } from "../../Provider/ThemeProvider";
import { FaAngleRight } from "react-icons/fa";

const Journey = () => {
  const { isDark } = useTheme();

  const options = [
    { id: "school", label: "Class 10–12 Student" },
    { id: "bachelors", label: "Bachelor's Student" },
    { id: "masters", label: "Master's Student" },
    { id: "graduate", label: "Graduate / Job Seeker" },
    { id: "careerSwitch", label: "Career Switcher" },
  ];

  return (
    <section
      className={`flex flex-col items-center gap-2 ${
        isDark ? "text-white" : ""
      }`}
    >
      <h2 className="font-bold text-3xl my-2">
        Shivam, Welcome to CareerLens
      </h2>

      <p className={`text-sm font-bold ${isDark ? "text-gray-500" : ""}`}>
        Lets build your personalized career roadmap in few seconds
      </p>

      <div className="w-full max-w-md flex flex-col gap-3 mt-4">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span>{option.label}</span>

            <div className="  flex items-center gap-3">
              <input
                type="radio"
                name="careerStage"
                id={option.id}
                className="accent-blue-500 hidden"
              />

              <FaAngleRight />
            </div>
          </label>
        ))}
      </div>
    </section>
  );
};

export default Journey;