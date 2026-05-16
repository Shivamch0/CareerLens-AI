import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaChartLine, FaCheck, FaClock, FaHeart } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

import CircularProgress from "../../components/Other/CircularProgress";
import Button from "../../components/Button/Button";
import { useTheme } from "../../Provider/ThemeProvider";

const Progress = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const progressItems = useMemo(() => {
    const aptitudeCompleted = Boolean(user?.onboarding?.aptitudeTestCompleted);
    const interestCompleted = Boolean(user?.onboarding?.interestTestCompleted);

    return [
      {
        title: "Aptitude Test",
        description: "Logical, numerical, verbal, and analytical ability",
        completed: aptitudeCompleted,
        progress: aptitudeCompleted ? 100 : 0,
        icon: <FaBrain />,
        tone: "blue",
      },
      {
        title: "Interest Test",
        description: "Preferences, motivations, and personality signals",
        completed: interestCompleted,
        progress: interestCompleted ? 100 : 0,
        icon: <FaHeart />,
        tone: "green",
      },
    ];
  }, [user]);

  const completedCount = progressItems.filter((item) => item.completed).length;
  const overallProgress = Math.round((completedCount / progressItems.length) * 100);
  const isReadyForReport = completedCount === progressItems.length;
  const nextStep = progressItems.find((item) => !item.completed)?.title;

  const handleNavigate = () => {
    navigate(isReadyForReport ? "../completed" : "../assessment");
  };

  const statusCards = [
    {
      label: "Completed",
      value: `${completedCount}/${progressItems.length}`,
      icon: <FaCheck />,
    },
    {
      label: "Overall Progress",
      value: `${overallProgress}%`,
      icon: <FaChartLine />,
    },
    {
      label: isReadyForReport ? "Next Step" : "Pending",
      value: isReadyForReport ? "Report" : nextStep,
      icon: isReadyForReport ? <IoDocumentText /> : <FaClock />,
    },
  ];

  return (
    <section className={`flex justify-center px-4 sm:px-6 lg:px-8 ${isDark ? "text-white" : "text-gray-900"}`}>
      <div
        className={`w-full max-w-5xl rounded-3xl border p-5 shadow-sm sm:p-8 ${
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Assessment progress
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {isReadyForReport
                ? "Your assessment is ready to analyze"
                : "Finish both tests to unlock your career report"}
            </h2>
            <p className={`mt-3 text-sm leading-6 sm:text-base ${isDark ? "text-gray-300" : "text-gray-500"}`}>
              Track what is complete, see what still needs attention, and move
              to the next step without losing your assessment flow.
            </p>
          </div>

          <div className={`flex justify-center rounded-2xl p-5 ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
            <CircularProgress
              percentage={overallProgress}
              color={isReadyForReport ? "#16A34A" : "#2563EB"}
              label={isReadyForReport ? "Ready" : "Complete"}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {statusCards.map((card) => (
            <div
              key={card.label}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-blue-600 shadow-sm ${isDark ? "bg-white/10" : "bg-white"}`}>
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {card.label}
                </p>
                <p className="truncate text-base font-bold">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {progressItems.map((item) => {
            const isGreen = item.tone === "green";
            const iconColor = isGreen ? "text-green-600" : "text-blue-600";
            const iconBg = isGreen ? "bg-green-100" : "bg-blue-100";
            const barColor = item.completed ? "bg-green-500" : "bg-blue-500";

            return (
              <article
                key={item.title}
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-white/10 bg-white/5" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className={`mt-1 text-sm leading-5 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.completed ? "Done" : "Pending"}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className={`h-2 flex-1 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className={`w-10 text-right text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {item.progress}%
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-bold text-blue-900">
              {isReadyForReport ? "All set" : "One more step"}
            </h4>
            <p className="mt-1 text-sm text-blue-700">
              {isReadyForReport
                ? "Submit your progress for processing and we will prepare your response."
                : "Complete the remaining test before generating your final response."}
            </p>
          </div>

          <Button
            title={isReadyForReport ? "Process Results" : "Continue Tests"}
            className="w-full bg-blue-500 py-3 text-white hover:bg-blue-700 sm:w-auto"
            onClick={handleNavigate}
          />
        </div>
      </div>
    </section>
  );
};

export default Progress;
