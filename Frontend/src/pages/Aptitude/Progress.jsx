import { useNavigate } from "react-router-dom"
import CircularProgress from "../../components/Other/CircularProgress";
import Button from "../../components/Button/Button"

const Progress = () => {
  const navigate = useNavigate();

  const handelNavigate = () => {
    navigate('../completed')
  }
  return (
    <section className="flex justify-center">
      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 w-180 flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="font-bold text-2xl md:text-3xl">Test Progress</h2>

          <p className="text-gray-500 mt-2">You're doing great! Keep it up.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <CircularProgress percentage={52} />

          {/* Status Card */}
          <div className="w-[320px] border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-lg">✔</span>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800">Aptitude Test</h5>

                <p className="text-gray-500 text-sm">12 / 25 Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4 border-b">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-lg">✓</span>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800">Interest Test</h5>

                <p className="text-gray-500 text-sm">16 / 30 Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-600 text-lg">⏱</span>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800">Remaining Time</h5>

                <p className="text-gray-500 text-sm">26:40 Min</p>
              </div>
            </div>
          </div>
        </div>

        <Button 
        title='Next'
        className={`mt-4 bg-blue-400 py-2 px-10 text-white hover:bg-blue-600`}
        onClick={handelNavigate}
         />

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl px-6 py-4 flex items-center gap-3 text-blue-600 text-sm">
          <span className="text-lg">📘</span>

          <p>Please don't refresh or close the window during the test.</p>
        </div>
      </div>
    </section>
  );
};

export default Progress;
