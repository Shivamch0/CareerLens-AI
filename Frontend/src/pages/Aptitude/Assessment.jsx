// Hooks Imports
import { useTheme } from "../../Provider/ThemeProvider";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

// Components Imports
import AptitudeCard from "../../components/Card/AptitudeCard";

// Other Imports
import brain from "../../assets/brain.png";
import greenHeart from "../../assets/greenHeart.png";

const Assessment = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user)


  const aptitudeCompleted = user?.onboarding?.aptitudeTestCompleted;
  const interestCompleted = user?.onboarding?.interestTestCompleted;


  const completedCount = [aptitudeCompleted, interestCompleted].filter(Boolean).length;
  const allCompleted = completedCount === 2;

  const handleAptitude = () => {
    navigate(aptitudeCompleted ? "../progress" : "../aptitudetest")
  };

  const handleInterests = () => {
    navigate(interestCompleted ? "../progress" : "../intereststest")
  };

  return (
    <section
      className={`text-center  flex flex-col items-center ${isDark ? "text-white" : ""}`}
    >
      <h2 className={`text-4xl font-bold mb-2`}>Assessment Overview</h2>
      <p className="text-base text-gray-500 mb-2">
        {allCompleted
          ? "Both sections are complete. Your progress is ready."
          : `Complete both sections to unlock your report. ${completedCount}/2 done.`}
      </p>
      <div className="flex flex-col justify-center gap-4 p-4 sm:flex-row">
        <AptitudeCard
          image={brain}
          title="Aptitude Test"
          para="Measures your logical, numerical, verbal, and analytical abilities"
          question={25}
          minute={30}
          style={` ${isDark ? "bg-gray-600/40  border-purple-400/40" : "bg-white border border-gray-200"}`}
          bgColor={`bg-blue-100`}
          progressColor={`bg-blue-600`}
          progress={aptitudeCompleted ? 100 : 0}
          completed={aptitudeCompleted}
          fn={handleAptitude}
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
          progress={interestCompleted ? 100 : 0}
          completed={interestCompleted}
          fn={handleInterests}
        />
      </div>
      <div className={`w-full max-w-2xl rounded-2xl bg-blue-100 px-4 py-4 text-sm font-bold text-blue-900`}>
        <p>
          {allCompleted
            ? "Review your progress to process your final career insights."
            : "You can't pause an active test. Please ensure you have enough time before starting."}
        </p>
      </div>
    </section>
  );
};

export default Assessment;
