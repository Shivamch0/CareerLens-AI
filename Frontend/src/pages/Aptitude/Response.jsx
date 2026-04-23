import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Response = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total } = location.state || {};

  const percentage = Math.round((score / total) * 100);

  return (
    <section className="flex justify-center">

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm w-150 px-10 py-12 text-center">


        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-md">
            <FaCheck size={40} className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Assessment Completed!
        </h2>


        <p className="text-lg text-gray-700 mb-4">
          Your Score: <strong>{score}</strong> / {total}
        </p>


        <p className="text-green-600 font-medium mb-6">
          Completion Accuracy: {percentage}%
        </p>


        <div className="bg-green-50 border border-green-100 rounded-xl text-left px-6 py-5 mb-8">

          <h4 className="text-green-700 font-semibold mb-4">
            What's Next?
          </h4>

          <div className="space-y-3 text-gray-600 text-sm">

            <div className="flex gap-3 items-center">
              <FaCheck size={18} className="text-green-500" />
              Matching your profile with top careers
            </div>

            <div className="flex gap-3 items-center">
              <FaCheck size={18} className="text-green-500" />
              Generating your skill-gap roadmap
            </div>

            <div className="flex gap-3 items-center">
              <FaCheck size={18} className="text-green-500" />
              Preparing personalized recommendations
            </div>

          </div>

        </div>


        <button
          onClick={() => navigate("/career-results")}
          className="bg-green-500 hover:bg-green-600 transition text-white px-8 py-3 rounded-xl font-medium shadow-sm"
        >
          View Results →
        </button>

      </div>

    </section>
  );
};

export default Response;