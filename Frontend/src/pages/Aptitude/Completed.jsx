import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import processing from "../../assets/processing.png";

const Completed = ({ progres = 72 }) => {
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
      }, 600); // small delay for smoother UX
    }
  }, [progress, navigate]);
  return (
    <section className=" flex  justify-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 w-150 px-10 py-8 text-center">
        <div className="flex justify-center bg-gray-200 rounded-2xl mb-1">
          <img src={processing} alt="processing" className="" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Processing Your Responses
        </h2>

        <p className="text-gray-500 mb-8">
          Please wait while we analyze your answers.
        </p>

        <div className="flex items-center gap-4">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <span className="text-gray-600 font-medium">{progress}%</span>
        </div>
      </div>
    </section>
  );
};

export default Completed;
