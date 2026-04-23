
import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Logo.png";

const FlowNavbar = ({ test = "", timeLeft }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <header className="px-2">
      <nav className="flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleNavigate}
        >
          <img className="w-12 h-12 rounded-full" src={logo} alt="" />
          <h3 className="text-lg md:text-2xl font-bold text-blue-600">
            CAREER
          </h3>
          <p
            className={`text-lg md:text-2xl font-bold ${isDark ? "text-white" : "text-blue-300"} `}
          >
            LENS
          </p>
        </div>
        <div className={`font-bold text-lg`}>
          <p>{test}</p>
        </div>

        {test && (
          <div className="items-center px-4">
            <p className="text-sm text-gray-600">Time left</p>
            <h3 className="font-bold text-2xl text-blue-500">{formatTime(timeLeft)}</h3>
          </div>
        )}
      </nav>
    </header>
  );
};

export default FlowNavbar;
