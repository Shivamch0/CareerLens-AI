import DashboardButton from "../../components/DashboardButton"

import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom"
import BoyImage from "../../assets/boy_image.png"

function FinalOnboarding() {

  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleNavigate = () => {
    navigate("/dashboard")
  }

  return (
    <section>
      <section
        className={` min-h-screen grid grid-col-1 lg:grid-cols-[1.8fr_1.2fr] items-start mt-20 gap-10 px-6 sm:px-8 md:px-10   ${isDark ? "text-white" : ""}`}
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 justify-center ">
          <h2 className={` font-bold text-2xl sm:text-3xl lg:text-4xl `}>
            Your Roadmap is Ready🚀
          </h2>
          <div className={`flex flex-col items-center gap-4 sm:gap-5 shadow p-4 sm:p-6 rounded-2xl ${isDark ? "bg-purple-400/10 shadow-purple-800" : "shadow-blue-500"}`}>
            <span className="flex gap-2">✔️<h2 className="text-base sm:text-lg ">Analyzing Interests</h2></span>
            <span className="flex gap-2">✔️<h2 className="text-base sm:text-lg ">Match your career paths</h2></span>
            <span className="flex gap-2">✔️<h2 className="text-base sm:text-lg ">Building skill roadmap</h2></span>
            <hr className="border-gray-300 dark:border-gray-600 w-full sm:w-60"/>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 font-bold">CareerLens adapts to your journey stage and creates your career roadmap</p>
          </div>
          <DashboardButton
            title="Go to Dashboard"
            fn={handleNavigate}
            style={` mt-3 w-full sm:w-auto ${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-blue-500 text-white"} `}
          />
          
        </div>

        <div className="hidden lg:block mt-10 ">
          <img
            src={BoyImage}
            className="w-full max-w-sm md:max-w-md lg:max-w-xl"
          />
        </div>
      </section>
    </section>
  )
}

export default FinalOnboarding