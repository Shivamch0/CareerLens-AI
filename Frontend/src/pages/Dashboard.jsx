// Hooks Imports
import { useTheme } from "../Provider/ThemeProvider";

// Components Imports
import StatsCard from "../components/Card/StatsCard";
import SuggestionCard from "../components/Card/SuggestionCard";

// Other Imports
import blueIcon from "../assets/blue_icon.png";
import clipboard from "../assets/clipboard.png";
import greenIcon from "../assets/green_icon.png";
import micIcon from "../assets/mic-icon.png";
import notes from "../assets/notes.png";
import redIcon from "../assets/red_icon.png";
import youngMan from "../assets/young_man.png";

function Dashboard() {
  const { isDark } = useTheme();
  return (
    <section className={`${isDark ? "text-white" : ''} px-4 sm:px-8 md:px-16 lg:px-30 `}>
      <h3 className="font-bold text-2xl mb-2">Welcome,Shivam👋</h3>
      <p className={`text-sm ${isDark ? "text-gray-400 " : 'text-black'}`}>B.Tech CSE | 4th Year</p>

      <div className="my-2">
        <p className={`mb-2 font-bold ${isDark ? " text-white/80 " : "text-gray-700"}`}> Skils: 5 | Test: 2 | Match Score: 78%</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatsCard
            content="Profile Completion "
            percentage="85"
            image={greenIcon}
            className={`${isDark  ? ' bg-gradient-to-r from-green-800 to-green-500' : "bg-gradient-to-r from-green-500/50 to-emerald-300/40 backdrop-blur-lg" }`}
            progressBar='bg-green-300'
          />
          <StatsCard
            content="Aptitude Score"
            percentage="72"
            image={blueIcon}
            className={`${isDark ? ' bg-gradient-to-r from-blue-800 to-blue-500' : 'bg-gradient-to-r from-blue-500/50 to-indigo-300/40 backdrop-blur-lg'} `}
            progressBar='bg-blue-300'
          />
          <StatsCard
            content="Resume Strength"
            percentage="68"
            image={redIcon}
            className={`${isDark ? ' bg-gradient-to-r from-red-800 to-red-500' : 'bg-gradient-to-r from-rose-500/50 to-orange-300/40 backdrop-blur-lg'} `}
            progressBar='bg-red-400'
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-5">
          <section className={` rounded-2xl p-6 shadow-xl flex ${isDark ? 'text-white bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#4c1d95] ' : 'bg-gradient-to-r from-slate-200/60 via-indigo-100/40 to-purple-100/40 backdrop-blur-md text-black'}`}>
            <div >
              <h4 className="text-gray-00 font-bold mb-3 ">Recommended Carrer</h4>
              <h3 className="text-lg font-bold mb-3">Software Developer</h3>
              <h5 className="text-yellow-500 font-bold mb-3">Match : 85%</h5>
              <p className="text-sm opacity-80 mb-3">Strong coding & analytical skills</p>
              <button className={`mt-4 px-4 py-2 transition font-bold text-sm cursor-pointer rounded-lg ${isDark ? 'bg-white/10  hover:bg-white/20' : 'bg-black/10 hover:bg-black/20 '}`}>View Roadmap</button>
            </div>
            
              <div >
                <img src={youngMan} className="h-50" />
              </div>
           
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <SuggestionCard image={clipboard} content='Aptitude Test' buttonText='Test' className={` ${isDark ? 'bg-gradient-to-br from-[#4f46e5] via-[#6d28d9] to-[#1e3a8a] ' : 'bg-gradient-to-r from-purple-400/40 via-violet-300/30 to-indigo-200/20 backdrop-blur-md'}`}/>
            <SuggestionCard image={notes} content='Analyze Resume' buttonText='Resume' className={`${isDark ? 'bg-gradient-to-br from-[#2bb7a9] via-[#1f9d94] to-[#0f766e]' : 'bg-gradient-to-r from-teal-400/40 via-cyan-300/30 to-teal-200/20 backdrop-blur-md'}`} />
            <SuggestionCard image={micIcon} content=' Mock Interview' buttonText='Interview' className={`${isDark ? 'bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c]' : 'bg-gradient-to-r from-orange-400/40 via-red-300/30 to-pink-200/20 backdrop-blur-md'}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4 ">
          <section className={`relative p-4 rounded-2xl shadow-xl ${isDark ? 'text-white bg-gradient-to-r from-[#4c1d95] via-[#1e293b] to-[#0f172a] ' : 'text-black bg-gradient-to-r from-slate-200/60 via-indigo-100/40 to-purple-100/40 backdrop-blur-md'}`}>
            <h2 className="text-lg font-bold mb-3">Skill Gap Analysis</h2>
            <hr  className="text-gray-500 w-100"/>
            <h3 className={`"font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'} my-1`}>Skills to Improve:</h3>
            <ul className={`"flex flex-col gap-1 text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-800'} mb-2`}>
              <li className="list-disc ml-7">Data Structures</li>
              <li className="list-disc ml-7">System</li>
              <li className="list-disc ml-7">Advanced React</li>
            </ul>
            <div className="flex absolute bottom-3 right-10">
              <button className={`"flex items-center text-sm font-bold mt-2 cursor-pointer  border-white/10 shadow shadow-gray-800 px-7 py-2 rounded-xl hover:brightness-80 ${isDark ? 'bg-gradient-to-br from-[#4f46e5] via-[#6d28d9] to-[#1e3a8a]' : 'hover:bg-gray-200'}`}>Improve Skills  </button>
            </div>
          </section>

          <section className={`p-4  rounded-2xl  shadow-xl ${isDark ? 'bg-gradient-to-r text-white from-[#4c1d95] via-[#1e293b] to-[#0f172a]' : 'bg-gradient-to-r from-slate-200/60 via-indigo-100/40 to-purple-100/40 backdrop-blur-md '}`} >
            <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
            <hr  className="text-gray-500 w-100"/>
            <div className="font-bold my-2 text-sm flex gap-2 items-center"><p className="text-lg">▶️</p>Aptitude Test: 72%</div>
            <hr  className="text-gray-500 w-100"/>
            <div className={`font-bold my-2 text-sm flex gap-2 items-center ${isDark ? 'text-gray-300' : 'text-gray-600'} `}><p className="text-lg">▶️</p>Resume Review: Need more keywords</div>
            <hr  className="text-gray-500 w-100"/>
            <div className={`font-bold my-2 text-sm flex gap-2 items-center ${isDark ? 'text-gray-300' : 'text-gray-600'} `}><p className="text-lg ">▶️</p>Mock Interview: Good communication</div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
