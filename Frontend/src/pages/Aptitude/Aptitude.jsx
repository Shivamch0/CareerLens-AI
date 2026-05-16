import { Outlet, useLocation , useNavigate , useOutletContext } from "react-router-dom";
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

  const context = useOutletContext()

  const handleNavigate = () => {
    navigate("assessment")
  }

  const isBaseRoute = location.pathname === "/aptitude";

  return (
    <>
      {isBaseRoute ? (
        <>
          <section className="grid gap-8 px-4 pb-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"}`}>
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Career assessment
              </p>
              <h2
                className={`font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4 ${isDark ? "text-white" : ""}`}
              >
                Aptitude and Interests Test
              </h2>
              <p className={`text-sm font-semibold leading-6 mb-5 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                This assessment helps us understand your aptitude strengths and
                interests so CareerLens can suggest better paths for you.
              </p>

              <div className={`flex p-3 items-center gap-3 mb-2 rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                <span className="p-3 bg-blue-100 rounded-xl">
                  <FaRegClock className="text-lg text-gray-600" />
                </span>
                <span>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>Duration</p>
                  <p
                    className={`font-bold text-base ${isDark ? "text-white" : ""}`}
                  >
                    55-60 Minutes
                  </p>
                </span>
              </div>

              <div className={`flex p-3 items-center gap-3 mb-2 rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                <span className="p-3 bg-blue-100 rounded-xl">
                  <AiOutlineBars className="text-lg text-gray-600" />
                </span>
                <span>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>Total Questions</p>
                  <p
                    className={`font-bold text-base ${isDark ? "text-white" : ""}`}
                  >
                    60 Questions
                  </p>
                </span>
              </div>

              <div className="flex p-5 items-center gap-4 bg-blue-50 rounded-2xl mb-5">
                <span>
                  <CiCircleInfo className="text-blue-700 text-2xl"/>
                </span>
                <div>
                  <p className="text-blue-900 font-bold">There are no right or wrong answers in the interest test.</p>
                  <p className="text-blue-900 font-bold">Answer honestly for accurate results.</p>
                </div>
              </div>

              <DashboardButton 
              title="Start Assessment" 
              fn={handleNavigate}
              />
            </div>

            <div className={`rounded-3xl border p-6 shadow-sm ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}>
              <img src={notes02} alt="assessment notes" className="mx-auto w-full max-w-lg object-contain" />
            </div>
          </section>
        </>
      ) : (
        <Outlet context={context} />
      )}
    </>
  );
};

export default Aptitude;
