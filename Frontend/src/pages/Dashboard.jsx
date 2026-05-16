// Hooks Imports
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Provider/ThemeProvider";

// Other Imports
import {
  FaArrowRight,
  FaBrain,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaFileAlt,
  FaMicrophone,
  FaRoute,
} from "react-icons/fa";
import youngMan from "../assets/young_man.png";

function Dashboard() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const profileCompletion = useMemo(() => {
    const checks = [
      user?.userName,
      user?.email,
      user?.careerStage,
      user?.education?.degree,
      user?.education?.branch,
      user?.interests?.length,
      user?.skills?.length,
      user?.onboarding?.aptitudeTestCompleted,
      user?.onboarding?.interestTestCompleted,
    ];

    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [user]);

  const aptitudeScore = user?.aptitudeTest?.percentage || 0;
  const completedTests = [
    user?.onboarding?.aptitudeTestCompleted,
    user?.onboarding?.interestTestCompleted,
  ].filter(Boolean).length;
  const matchScore = Math.round(
    (profileCompletion + aptitudeScore + completedTests * 50) / 3,
  );

  const stats = [
    {
      label: "Profile Completion",
      value: profileCompletion,
      icon: <FaCheckCircle />,
      color: "green",
    },
    {
      label: "Aptitude Score",
      value: aptitudeScore,
      icon: <FaBrain />,
      color: "blue",
    },
    {
      label: "Career Match",
      value: matchScore,
      icon: <FaChartLine />,
      color: "rose",
    },
  ];

  const quickActions = [
    {
      title: "Assessment",
      description: `${completedTests}/2 tests complete`,
      icon: <FaClipboardList />,
      route: "/aptitude/assessment",
      color: "blue",
    },
    {
      title: "Resume Review",
      description: "Improve keywords and structure",
      icon: <FaFileAlt />,
      route: "/resume",
      color: "teal",
    },
    {
      title: "Mock Interview",
      description: "Practice answers and delivery",
      icon: <FaMicrophone />,
      route: "/interview",
      color: "orange",
    },
  ];

  const skillGaps = [
    ...(user?.skills?.length ? [] : ["Add your current skills"]),
    aptitudeScore < 70 ? "Timed aptitude practice" : null,
    "Portfolio project planning",
    "Resume keyword alignment",
  ].filter(Boolean);

  const activities = [
    {
      title: "Assessment progress",
      detail: `${completedTests}/2 tests completed`,
      icon: <FaClipboardList />,
    },
    {
      title: "Aptitude score",
      detail: aptitudeScore ? `${aptitudeScore}% recorded` : "Not attempted yet",
      icon: <FaBrain />,
    },
    {
      title: "Profile strength",
      detail: `${profileCompletion}% complete`,
      icon: <FaCheckCircle />,
    },
  ];

  return (
    <section
      className={`px-4 pb-10 sm:px-8 md:px-12 lg:px-16 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`rounded-3xl border p-5 shadow-sm sm:p-7 ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Career dashboard
              </p>
              <h2 className="text-2xl font-bold sm:text-4xl">
                Welcome, {user?.userName || "Student"}
              </h2>
              <p
                className={`mt-3 text-sm leading-6 sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {user?.education?.degree || "Your profile"}{" "}
                {user?.education?.branch ? `| ${user.education.branch}` : ""}
                {user?.careerStage ? ` | ${formatLabel(user.careerStage)}` : ""}
              </p>
            </div>

            <div
              className={`rounded-2xl px-4 py-3 ${
                isDark ? "bg-blue-500/15" : "bg-blue-50"
              }`}
            >
              <p className="text-sm font-semibold text-blue-600">
                Skills: {user?.skills?.length || 0} | Tests: {completedTests}/2 |
                Match Score: {matchScore}%
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <MetricCard key={stat.label} stat={stat} isDark={isDark} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section
            className={`overflow-hidden rounded-3xl border shadow-sm ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex flex-col gap-5 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <FaBriefcase />
                </div>
                <h3 className="text-2xl font-bold">Recommended career path</h3>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Complete both assessments to unlock a personalized career
                  report. Your current profile points toward software and
                  analytical roles.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Pill>Software Development</Pill>
                  <Pill>Analytical Thinking</Pill>
                  <Pill>{matchScore}% profile match</Pill>
                </div>
                <button
                  onClick={() => navigate("/aptitude/progress")}
                  className="mt-6 flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  View Assessment Progress <FaArrowRight />
                </button>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  src={youngMan}
                  alt="career guidance"
                  className="h-52 object-contain sm:h-64"
                />
              </div>
            </div>
          </section>

          <section
            className={`rounded-3xl border p-5 shadow-sm sm:p-6 ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Quick actions</h3>
                <p
                  className={`mt-1 text-sm ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Continue the work that moves your profile forward.
                </p>
              </div>
              <FaRoute className="text-blue-600" />
            </div>

            <div className="space-y-3">
              {quickActions.map((action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                  isDark={isDark}
                  onClick={() => navigate(action.route)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <InfoPanel title="Skill gap focus" isDark={isDark}>
            <div className="space-y-3">
              {skillGaps.map((skill) => (
                <div
                  key={skill}
                  className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-semibold">{skill}</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                    Focus
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/skills")}
              className={`mt-5 rounded-2xl px-5 py-3 text-sm font-bold transition ${
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Improve Skills
            </button>
          </InfoPanel>

          <InfoPanel title="Recent activity" isDark={isDark}>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-3 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{activity.title}</p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {activity.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </InfoPanel>
        </div>
      </div>
    </section>
  );
}

const colors = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  rose: "bg-rose-100 text-rose-700",
  teal: "bg-teal-100 text-teal-700",
  orange: "bg-orange-100 text-orange-700",
};

const MetricCard = ({ stat, isDark }) => (
  <article
    className={`rounded-2xl border p-5 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p
          className={`text-sm font-semibold ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {stat.label}
        </p>
        <p className="mt-2 text-3xl font-bold">{stat.value}%</p>
      </div>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[stat.color]}`}
      >
        {stat.icon}
      </div>
    </div>

    <div
      className={`mt-5 h-2 overflow-hidden rounded-full ${
        isDark ? "bg-white/10" : "bg-gray-200"
      }`}
    >
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-500"
        style={{ width: `${stat.value}%` }}
      />
    </div>
  </article>
);

const ActionCard = ({ action, isDark, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
      isDark
        ? "border-white/10 bg-white/5 hover:bg-white/10"
        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
    }`}
  >
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors[action.color]}`}
    >
      {action.icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-bold">{action.title}</p>
      <p
        className={`truncate text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}
      >
        {action.description}
      </p>
    </div>
    <FaArrowRight className="shrink-0 text-gray-400" />
  </button>
);

const InfoPanel = ({ title, children, isDark }) => (
  <section
    className={`rounded-3xl border p-5 shadow-sm sm:p-6 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
    }`}
  >
    <h3 className="mb-4 text-xl font-bold">{title}</h3>
    {children}
  </section>
);

const Pill = ({ children }) => (
  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
    {children}
  </span>
);

const formatLabel = (value) => {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default Dashboard;
