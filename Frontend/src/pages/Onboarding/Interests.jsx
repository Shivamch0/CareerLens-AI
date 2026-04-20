// Hooks Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Provider/ThemeProvider";

// Components Imports
import DashboardButton from "../../components/DashboardButton";

// Others Imports
import { IoSchool } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";
import { TbBrandAdobeIndesign } from "react-icons/tb";
import { MdHealthAndSafety } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";

const Interests = () => {
  const [selected, setSelected] = useState([]);
  const [otherInterest , setOtherInterest] = useState("")

  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/onboarding-final");
  };

  const toggleOption = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const options = [
    {
      id: "technology",
      label: "Technology",
      icon: <IoSchool />,
    },
    {
      id: "business",
      label: "Business",
      icon: <FaBusinessTime />,
    },
    {
      id: "design",
      label: "Design",
      icon: <TbBrandAdobeIndesign />,
    },
    {
      id: "helthCare",
      label: "HelthCare",
      icon: <MdHealthAndSafety />,
    },
    {
      id: "governmentJobs",
      label: "Government Jobs",
      icon: <RiGovernmentFill />,
    },
    {
      id: "research",
      label: "Research",
      icon: <FaSearch />,
    },
    {
      id: "others",
      label: "Others",
      icon: <FaEllipsis />,
    },
  ];

  return (
    <section
      className={`flex flex-col items-center gap-2 my-3 overflow-hidden${
        isDark ? "text-white" : ""
      }`}
    >
      <h2 className={`font-bold text-3xl my-2 ${isDark ? "text-white" : ""}`}>
        What interests you most?
      </h2>

      <p
        className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-600"}`}
      >
        CareerLens want some info to help you.
      </p>

      <div className="w-full max-w-md flex flex-col gap-3 mt-4">
        {options.map((option) => {
          const isSelected = selected.includes(option.id)

          return (
          <label
            key={option.id}
            htmlFor={option.id}
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
                  selected.includes(option.id)
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 border-purple-400 text-white scale-[1.02]"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }
              `}
          >
            <div
              className={`flex items-center gap-4 font-bold text-lg ${isDark ? "text-white" : ""}`}
            >
              <div
                className={`text-2xl  ${isDark ? " text-purple-300" : "text-blue-300"} `}
              >
                {option.icon}
              </div>

              {option.label}
            </div>

            <div className="  flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={() => toggleOption(option.id)}
                name="careerStage"
                id={option.id}
                className="accent-blue-500 hidden"
              />
            </div>

            {option.id === "others" && isSelected && (
              <input
                type="text"
                placeholder="Enter your interest..."
                value={otherInterest}
                onChange={(e) => setOtherInterest(e.target.value)}
                className="mt-2 mx-2 px-4 py-2 w-full rounded-xl bg-white/10 border border-white/20 outline-none"
              />
            )}
          </label>
        )
        })}
      </div>

      <DashboardButton
        title="Next"
        style={`mt-2 px-6 ${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-blue-500 text-white "} `}
        fn={handleNavigate}
      />
    </section>
  );
};

export default Interests;
