//Hooks Imports
import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom"

// Components Imports
import DashboardButton from "../../components/DashboardButton";

// Other Imports
import lightBgImage from "../../assets/Light_image.png";

const Onboarding = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/onboarding-journey');
  }

  return (
    <>
      <section
        className={`grid grid-cols-[1.8fr_1.2fr] justify-center gap-10 px-4 md:px-10   ${isDark ? "text-white" : ""}`}
      >
        <div className="flex flex-col items-center gap-5 justify-center ">
          <h2 className={` font-bold text-3xl `}>
            Shivam, Welcome to CareerLens
          </h2>
          <p className={`text-lg ${isDark ? "text-gray-500" : ""}`}>
            Lets build your personalized career roadmap in few seconds
          </p>
          <DashboardButton
            title="Start My Career Setup"
            style={` mt-2 ${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-blue-500 text-white"} `}
            fn={handleNavigate}
          />
          <p className={`text-sm font-bold ${isDark ? "text-gray-400" : ""}`}>
            No long forms, just smart guidance
          </p>
        </div>

        <div className="hidden lg:block mt-30">
          <img
            src={lightBgImage}
            className="w-full max-w-md md:max-w-lg lg:max-w-2xl "
          />
        </div>
      </section>
    </>
  );
};

export default Onboarding;
