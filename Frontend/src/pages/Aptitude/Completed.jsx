import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaChartLine, FaRoute } from "react-icons/fa";

import { useTheme } from "../../Provider/ThemeProvider";
import processing from "../../assets/processing.png";

const steps = [
  "Reading your assessment answers",
  "Matching strengths with career paths",
  "Preparing your roadmap",
];

const Completed = () => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }

        return prev + 5;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const redirect = setTimeout(() => {
        navigate("../response");
      }, 600);

      return () => clearTimeout(redirect);
    }
  }, [progress, navigate]);

  return (
    <section className={`flex justify-center px-4 sm:px-6 lg:px-8 ${isDark ? "text-white" : "text-gray-900"}`}>
      <div
        className={`w-full max-w-4xl rounded-3xl border p-5 shadow-sm sm:p-8 ${
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
        }`}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className={`rounded-3xl p-5 ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
            <img
              src={processing}
              alt="processing"
              className="mx-auto w-56 object-contain sm:w-72"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
              Processing
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Turning your answers into career insights
            </h2>
            <p className={`mt-3 text-sm leading-6 sm:text-base ${isDark ? "text-gray-300" : "text-gray-500"}`}>
              We are analyzing your aptitude, interests, and profile details to
              prepare a focused recommendation report.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className={`h-3 flex-1 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={`w-12 text-right text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                {progress}%
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {steps.map((step, index) => {
                const done = progress >= (index + 1) * 30;
                const icons = [<FaCheck />, <FaChartLine />, <FaRoute />];

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        done
                          ? "bg-green-100 text-green-700"
                          : isDark
                            ? "bg-white/10 text-gray-400"
                            : "bg-white text-gray-400"
                      }`}
                    >
                      {icons[index]}
                    </span>
                    <p className={`text-sm font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>{step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Completed;
