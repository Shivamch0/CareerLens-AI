// Hooks Imports
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaRegClock, FaRoute } from "react-icons/fa";

import { useTheme } from "../../Provider/ThemeProvider";
import AptitudeCard from "../../components/Card/AptitudeCard";
import brain from "../../assets/brain.png";
import greenHeart from "../../assets/greenHeart.png";

const Assessment = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const aptitudeCompleted = user?.onboarding?.aptitudeTestCompleted;
  const interestCompleted = user?.onboarding?.interestTestCompleted;
  const completedCount = [aptitudeCompleted, interestCompleted].filter(Boolean).length;
  const allCompleted = completedCount === 2;

  const handleAptitude = () => {
    navigate(aptitudeCompleted ? "../progress" : "../aptitudetest");
  };

  const handleInterests = () => {
    navigate(interestCompleted ? "../progress" : "../intereststest");
  };

  return (
    <section className={`px-4 pb-10 ${isDark ? "text-white" : "text-gray-900"}`}>
      <div className="mx-auto max-w-5xl">
        <div
          className={`rounded-3xl border p-5 shadow-sm sm:p-8 ${
            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Assessment overview
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Complete both sections to unlock your report
              </h2>
              <p
                className={`mt-3 text-sm leading-6 sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {allCompleted
                  ? "Both sections are complete. You can now process your final career insights."
                  : `You have completed ${completedCount} of 2 sections. Start with either section and continue at your own pace before submitting.`}
              </p>
            </div>

            <div
              className={`rounded-2xl px-5 py-4 ${
                isDark ? "bg-blue-500/15" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3 text-blue-700">
                <FaCheckCircle />
                <p className="text-2xl font-bold">{completedCount}/2</p>
              </div>
              <p className="mt-1 text-sm font-semibold text-blue-700">
                Sections complete
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MiniStat icon={<FaRegClock />} label="Duration" value="55-60 min" />
            <MiniStat icon={<FaRoute />} label="Flow" value="2 sections" />
            <MiniStat icon={<FaCheckCircle />} label="Result" value="Career report" />
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-center gap-4 lg:flex-row">
          <AptitudeCard
            image={brain}
            title="Aptitude Test"
            para="Measures your logical, numerical, verbal, and analytical abilities"
            question={25}
            minute={30}
            style={`w-full lg:w-80 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border border-gray-200"
            }`}
            bgColor="bg-blue-100"
            progressColor="bg-blue-600"
            progress={aptitudeCompleted ? 100 : 0}
            completed={aptitudeCompleted}
            fn={handleAptitude}
          />
          <AptitudeCard
            image={greenHeart}
            title="Interest Test"
            para="Helps us understand your preferences, motivations, and personality"
            question={30}
            minute={30}
            style={`w-full lg:w-80 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border border-gray-200"
            }`}
            bgColor="bg-green-100"
            progressColor="bg-green-600"
            progress={interestCompleted ? 100 : 0}
            completed={interestCompleted}
            fn={handleInterests}
          />
        </div>

        <div
          className={`mt-5 flex flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-blue-100 bg-blue-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-gray-200" : "text-blue-900"
            }`}
          >
            {allCompleted
              ? "Your assessment is ready. Process the final response whenever you are ready."
              : "You cannot pause an active test, so begin when you have enough uninterrupted time."}
          </p>
          <button
            type="button"
            onClick={() => navigate(allCompleted ? "../progress" : "../aptitudetest")}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            {allCompleted ? "View Progress" : "Start Aptitude"}
          </button>
        </div>
      </div>
    </section>
  );
};

const MiniStat = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
      {icon}
    </div>
    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className="mt-1 font-bold text-gray-900">{value}</p>
  </div>
);

export default Assessment;
