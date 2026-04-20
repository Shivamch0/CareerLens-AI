import { useState } from "react";
import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom";

// Components Imoports
import DashboardButton from "../../components/DashboardButton";

// Others Imports
import { FaUserGraduate, FaBriefcase, FaUserTie } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaAngleRight } from "react-icons/fa";

const Journey = () => {
  const [selected, setSelected] = useState("");
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/onboarding-interests");
  };

  const handleClick = (id) => {
    setSelected(id);
  };

  const options = [
    {
      id: "school",
      label: "Class 10-12 Student",
      icon: <IoSchool />,
    },
    {
      id: "bachelors",
      label: "Bachelor’s Student",
      icon: <FaUserGraduate />,
    },
    {
      id: "masters",
      label: "Master’s Student",
      icon: <FaUserGraduate />,
    },
    {
      id: "graduate",
      label: "Graduate / Job Seeker",
      icon: <FaUserTie />,
    },
    {
      id: "switcher",
      label: "Career Switcher",
      icon: <FaBriefcase />,
    },
  ];

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center overflow-hidden gap-2 ${
        isDark ? "text-white" : ""
      }`}
    >
      <h2 className={`font-bold text-3xl mb-2 ${isDark ? "text-white" : ""}`}>
        Where are you in your Journey?
      </h2>

      <p
        className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-600"}`}
      >
        Lets build your personalized career roadmap in few seconds
      </p>

      <div className="w-full max-w-md flex flex-col gap-3 mt-3">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            onClick={() => handleClick(option.id)}
            className={`
              relative
              flex
              items-center
              justify-between
              px-6
              py-4
              rounded-2xl
              backdrop-blur-md
              bg-white/10
              border
              border-white/20
              shadow-lg
              cursor-pointer
              transition
              duration-300
              hover:bg-white/20
              hover:scale-[1.02]
              ${isDark ? "hover:shadow-purple-500/40" : "hover:shadow-blue-500/40"}


              ${
                selected === option.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 border-purple-400 text-white scale-[1.02]"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }
            `}
          >
            <div
              className={`flex items-center gap-4 font-bold text-lg ${isDark ? "text-white" : ""}`}
            >
              <div
                className={`text-2xl ${isDark ? " text-purple-300" : "text-blue-300"} `}
              >
                {option.icon}
              </div>

              {option.label}
            </div>

            <div className="  flex items-center gap-3">
              <input
                type="radio"
                name="careerStage"
                id={option.id}
                className="accent-blue-500 hidden"
              />

              <FaAngleRight
                className={`text-lg  font-bold ${isDark ? "text-white" : ""}`}
              />
            </div>
          </label>
        ))}
      </div>

      <DashboardButton
        title="Next"
        style={`mt-2 px-6 ${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-blue-500 text-white "} `}
        fn={handleNavigate}
      />
    </section>
  );
};

export default Journey;
