import { Outlet, useLocation , useNavigate } from "react-router-dom";
import { useTheme } from "../../Provider/ThemeProvider";

// Components Imports
import DashboardButton from "../../components/Button/DashboardButton";

// Other Imports
import notes02 from "../../assets/notes02.png";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";

const Aptitude = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("assessment")
  }

  const isBaseRoute = location.pathname === "/aptitude";

  return (
    <>
      {isBaseRoute ? (
        <>
          <section className={`flex items-center`}>
            <div className={``}>
              <h2
                className={`font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4 ${isDark ? "text-white" : ""}`}
              >
                Aptitude and Interests Test
              </h2>
              <p className="text-sm font-bold text-gray-500 mb-2">
                This assessment will help us understsnd your aptitude strengths
                and interests to suggest best career paths for you
              </p>

              <div className="flex p-2 items-center gap-3 mb-2">
                <span className="p-2 bg-blue-200 rounded-lg">
                  <FaRegClock className="text-lg text-gray-600" />
                </span>
                <span>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p
                    className={`font-bold text-base ${isDark ? "text-white" : ""}`}
                  >
                    55-60 Minutes
                  </p>
                </span>
              </div>

              <div className="flex p-2 items-center gap-3 mb-2">
                <span className="p-2 bg-blue-200 rounded-lg">
                  <AiOutlineBars className="text-lg text-gray-600" />
                </span>
                <span>
                  <p className="text-sm text-gray-500">Total Questions</p>
                  <p
                    className={`font-bold text-base ${isDark ? "text-white" : ""}`}
                  >
                    55 Questions
                  </p>
                </span>
              </div>

              <div className="flex p-6 items-center gap-4 bg-blue-200 rounded-lg mb-4">
                <span>
                  <CiCircleInfo className="text-blue-700 text-2xl"/>
                </span>
                <div>
                  <p className="text-blue-900 font-bold">No right or wrong in interest test.</p>
                  <p className="text-blue-900 font-bold">Answer honestly for accurate results.</p>
                </div>
              </div>

              <DashboardButton 
              title="Start Assessment" 
              fn={handleNavigate}
              />
            </div>

            <div>
              <img src={notes02} className="w-lg" />
            </div>
          </section>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Aptitude;
