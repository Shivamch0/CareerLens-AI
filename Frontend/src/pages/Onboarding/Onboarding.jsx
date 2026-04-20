//Hooks Imports
import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom";

// Components Imports
import DashboardButton from "../../components/DashboardButton";

// Other Imports
import lightBgImage from "../../assets/Light_image.png";

const Onboarding = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/onboarding-journey");
  };

  return (
    <>
      <section
        className={`min-h-screen grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr]  gap-10 px-6 md:px-10 ${
          isDark ? "text-white" : ""
        }`}
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 justify-center">
          <h2 className={`font-bold text-2xl sm:text-3xl lg:text-4xl`}>
            Shivam, Welcome to CareerLens
          </h2>
          <p
            className={`text-base sm:text-lg ${isDark ? "text-gray-500" : ""}`}
          >
            Lets build your personalized career roadmap in few seconds
          </p>
          <DashboardButton
            title="Start My Career Setup"
            style={` w-full sm:w-auto mt-2 ${
              isDark
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-blue-500 text-white"
            } `}
            fn={handleNavigate}
          />
          <p className={`text-sm font-bold ${isDark ? "text-gray-400" : ""}`}>
            No long forms, just smart guidance
          </p>
        </div>

        <div className="hidden lg:block mt-40">
          <img
            src={lightBgImage}
            className="w-full max-w-sm md:max-w-md lg:max-w-2xl "
          />
        </div>
      </section>
    </>
  );
};

export default Onboarding;
