import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegClock } from "react-icons/fa";

import { useTheme } from "../../Provider/ThemeProvider";
import logo from "../../assets/Logo.png";

const FlowNavbar = ({ test = "", timeLeft }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const formatTime = (time) => {
    if (time === null || time === undefined) return "Loading";

    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const title = test
    ? `${test.charAt(0).toUpperCase()}${test.slice(1)} Test`
    : "Assessment";

  return (
    <header className="px-2 sm:px-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-3xl border px-4 py-3 shadow-sm ${
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
        }`}
      >
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img className="h-11 w-11 rounded-full" src={logo} alt="CareerLens" />
          <span className="hidden text-xl font-bold sm:inline">
            <span className="text-blue-600">CAREER</span>
            <span className={isDark ? "text-white" : "text-blue-300"}>
              LENS
            </span>
          </span>
        </button>

        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-bold uppercase tracking-wide text-blue-600">
            {title}
          </p>
          <button
            type="button"
            onClick={() => navigate("/aptitude/assessment")}
            className={`mt-1 hidden items-center gap-2 text-xs font-semibold sm:inline-flex ${
              isDark ? "text-gray-300" : "text-gray-500"
            }`}
          >
            <FaArrowLeft /> Back to overview
          </button>
        </div>

        <div
          className={`rounded-2xl px-3 py-2 text-right ${
            isDark ? "bg-blue-500/15" : "bg-blue-50"
          }`}
        >
          <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wide text-blue-600">
            <FaRegClock /> Time
          </div>
          <p className="text-lg font-bold text-blue-600">
            {test ? formatTime(timeLeft) : "--:--"}
          </p>
        </div>
      </nav>
    </header>
  );
};

export default FlowNavbar;
