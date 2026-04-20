import { Outlet, useLocation } from "react-router-dom";

// Components Imports
import DashboardButton from "../../components/DashboardButton"

// Other Imports
import notes02 from "../../assets/notes02.png";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";

const Apptitude = () => {
  const location = useLocation();

  const isBaseRoute = location.pathname === "/apptitude";

  return (
    <>
      {isBaseRoute ? (
        <>
          <section className={`flex items-center`}>
            <div className={``}>
              <h2 className={`font-extrabold text-2xl sm:text-3xl md:text-4xl`}>Apptitude and Interests Test</h2>
              <p>
                This assessment will help us understsnd your aptitude strengths
                and interests to suggest best career paths for you
              </p>

              <div>
                <span>
                  <FaRegClock />
                </span>
                <span>
                  <p>Duration</p>
                  <p>55-60 Minutes</p>
                </span>
              </div>

               <div>
                <span>
                  <AiOutlineBars />
                </span>
                <span>
                  <p>Total Questions</p>
                  <p>55 Questions</p>
                </span>
              </div>

              <div>
                <span><CiCircleInfo /></span>
                <p>No right or wrong in interest test. Answer honestly for accurate results.</p>
              </div>

              <DashboardButton
              title='Start Assessment'
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

export default Apptitude;
