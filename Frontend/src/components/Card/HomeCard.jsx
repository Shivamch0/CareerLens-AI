import { useTheme } from "../../Provider/ThemeProvider"

function HomeCard({ title, content, icon }) {
  const { isDark } = useTheme()
  return (

    <div className="relative rounded-3xl p-[1.5px]">
      <div
        className="absolute inset-0 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.6)] border border-purple-400/40"
      ></div>

      <div
        className=" flex flex-col sm:flex-row gap-4 items-start sm:items-center relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-white"
      >
        <div className={`text-4xl ${isDark ? 'text-blue-400' : "text-blue-600"} `}>{icon}</div>

        <div className="flex flex-col gap-2">
          <h4 className={`text-2xl font-bold ${isDark ? '' : 'text-blue-800'}`}>{title}</h4>
          <hr className="border-gray-300 dark:border-gray-600 w-full sm:w-60" />
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
