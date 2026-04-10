function StatsCard({ image, className ,  content, percentage , progressBar }) {
  return (
    <div
      className={`cursor-pointer flex flex-col sm:flex-row p-4 sm:p-5 gap-4 rounded-2xl my-2 shadow-lg w-full max-w-xl shadow-lg hover:scale-105 transition duration-300 ${className}`}
    >
      <div >
        <h3 className="text-base sm:text-lg whitespace-nowrap font-semibold opacity-90">{content}</h3>

        <div className="flex items-end gap-1 mt-2">
          <h2 className="text-xl sm:text-2xl font-bold">{percentage}</h2>
          <span className="text-lg mb-1">%</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-2 bg-green-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressBar} rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center sm:justify-end items-center w-full sm:w-auto">
        <img
          src={image}
          alt="progress"
          className="w-20 sm:w-24 md:w-28 object-contain"
        />
      </div>
    </div>
  );
}

export default StatsCard;
