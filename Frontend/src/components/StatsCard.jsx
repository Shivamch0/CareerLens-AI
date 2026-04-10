function StatsCard({ image, className ,  content, percentage , progressBar }) {
  return (
    <div
      className={`cursor-pointer flex p-2 rounded-2xl my-2 shadow-lg w-full max-w-xl shadow-lg hover:scale-105 transition duration-300 ${className}`}
    >
      <div >
        <h3 className="text-lg whitespace-nowrap font-semibold opacity-90">{content}</h3>

        <div className="flex items-end gap-1 mt-2">
          <h2 className="text-2xl font-bold">{percentage}</h2>
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

      <div className="flex justify-center items-center h-full">
        <img
          src={image}
          alt="progress"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default StatsCard;
