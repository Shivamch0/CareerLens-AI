// Hooks Imports
import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom"

// Components Imports
import AptitudeCard from "../../components/Card/AptitudeCard";

// Other Imports
import brain from "../../assets/brain.png";
import greenHeart from "../../assets/greenHeart.png";

const Assessment = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleApptitude = () => {
    navigate("../apptitudetest")
  }

  const handleInterests = () => {
    navigate("../intereststest")
  }

  return (
    <section
      className={`text-center  flex flex-col items-center ${isDark ? "text-white" : ""}`}
    >
      <h2 className={`text-4xl font-bold mb-2`}>Assessment Overview</h2>
      <p className="text-base text-gray-500 mb-2">
        The test is divided into 2 sections
      </p>
      <div className="flex justify-center p-4  gap-4">
        <AptitudeCard
          image={brain}
          title="Apptitude Test"
          para="Measures your logical, numerical, verbal, and analytical ablities"
          question={25}
          minute={30}
          style={` ${isDark ? "bg-gray-600/40  border-purple-400/40" : "bg-white border border-gray-200"}`}
          bgColor={`bg-blue-100`}
          progressColor={`bg-blue-600`}
          fn={handleApptitude}
        />
        <AptitudeCard
          image={greenHeart}
          title="Interest Test"
          para="Help us understand your interests, preferences and personality"
          question={30}
          minute={30}
          style={` ${isDark ? "bg-gray-600/40  border-purple-400/40" : "bg-white border border-gray-200"}`}
          bgColor={`bg-green-100`}
          progressColor={`bg-green-600`}
          fn={handleInterests}
        />
      </div>
      <div className={`py-4 w-150 bg-blue-200 text-sm font-bold rounded-2xl`}>
        <p>
          You can't pause the assessment. Please ensure you have enough time.
        </p>
      </div>
    </section>
  );
};

export default Assessment;
