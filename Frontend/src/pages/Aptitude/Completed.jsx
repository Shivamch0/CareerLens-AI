import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import processing from "../../assets/processing.png";

const Completed = () => {
  const [progress, setProgress] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        navigate("../response");
      }, 600);
    }
  }, [progress, navigate]);

  return (
    <section className=" flex justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div
        className="bg-white rounded-3xl shadow-sm border border-gray-200 
                      w-full max-w-xl 
                      px-6 sm:px-8 md:px-10 
                      py-6 sm:py-8 
                      text-center"
      >
        <div className="flex justify-center bg-gray-100 rounded-2xl mb-4 p-4">
          <img
            src={processing}
            alt="processing"
            className="w-40 sm:w-48 md:w-52"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Processing Your Responses
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
          Please wait while we analyze your answers.
        </p>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-gray-600 font-medium text-sm sm:text-base">
            {progress}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default Completed;
