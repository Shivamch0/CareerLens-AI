// Hooks Imports
import { useTheme } from "../Provider/ThemeProvider";

// Components Imports
import StatsCard from "../components/StatsCard";
import SuggestionCard from "../components/SuggestionCard";

// Other Imports
import blueIcon from "../assets/blue_icon.png";
import clipboard from "../assets/clipboard.png";
import greenIcon from "../assets/green_icon.png";
import micIcon from "../assets/mic-icon.png";
import notes from "../assets/notes.png";
import redIcon from "../assets/red_icon.png";
import youngMan from "../assets/young_man.png";
import { FaAngleRight } from "react-icons/fa";

function Dashboard() {
  const { isDark } = useTheme();
  return (
    <section className={`${isDark ? "text-white" : ''} px-30 `}>
      <h3 className="font-bold text-2xl mb-2">Welcome,Shivam👋</h3>
      <p className="text-gray-400 text-sm">B.Tech CSE | 4th Year</p>

      <div className="my-2">
        <p className="font-bold text-white/80 mb-2"> Skils: 5 | Test: 2 | Match Score: 78%</p>

        <div className="grid grid-cols-3 gap-5 ">
          <StatsCard
            content="Profile Completion "
            percentage="85"
            image={greenIcon}
            className=' bg-gradient-to-r from-green-800 to-green-500'
            progressBar='bg-green-300'
          />
          <StatsCard
            content="Aptitude Score"
            percentage="72"
            image={blueIcon}
            className=' bg-gradient-to-r from-blue-800 to-blue-500'
            progressBar='bg-blue-300'
          />
          <StatsCard
            content="Resume Strength"
            percentage="68"
            image={redIcon}
            className=' bg-gradient-to-r from-red-800 to-red-500'
            progressBar='bg-red-400'
          />
        </div>

        <div className="grid grid-cols-2 my-2 gap-5">
          <section className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#4c1d95] rounded-2xl p-6 text-white shadow-xl flex">
            <div >
              <h4 className="text-gray-00 font-bold whitespace-nowrap mb-3 ">Recommended Carrer</h4>
              <h3 className="text-lg font-bold mb-3">Software Developer</h3>
              <h5 className="text-yellow-500 font-bold mb-3">Match : 85%</h5>
              <p className="whitespace-nowrap text-sm opacity-80 mb-3">Strong coding & analytical skills</p>
              <button className=" mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition font-bold text-sm cursor-pointer">View Roadmap</button>
            </div>
            
              <div >
                <img src={youngMan} className="h-50" />
              </div>
           
          </section>
          <div className="grid grid-cols-3 gap-5">
            <SuggestionCard image={clipboard} content='Aptitude Test' buttonText='Test' className='bg-gradient-to-br from-[#4f46e5] via-[#6d28d9] to-[#1e3a8a] '/>
            <SuggestionCard image={notes} content='Analyze Resume' buttonText='Resume' className='bg-gradient-to-br from-[#2bb7a9] via-[#1f9d94] to-[#0f766e]' />
            <SuggestionCard image={micIcon} content=' Mock Interview' buttonText='Interview' className='bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c]' />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-4 ">
          <section className="relative p-4 bg-gradient-to-r from-[#4c1d95] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 text-white shadow-xl ">
            <h2 className="text-lg font-bold mb-3">Skill Gap Analysis</h2>
              <hr  className="text-gray-500 w-100"/>
            <h3 className="font-bold text-gray-300 my-1">Skills to Improve:</h3>
            <ul className="flex flex-col gap-1 text-sm font-bold text-gray-400 mb-2">
              <li className="list-disc ml-7">Data Structures</li>
              <li className="list-disc ml-7">System</li>
              <li className="list-disc ml-7">Advanced React</li>
            </ul>
            <div className="flex absolute bottom-3 right-10">
              <button className="flex items-center bg-gradient-to-br from-[#4f46e5] via-[#6d28d9] to-[#1e3a8a] text-sm font-bold mt-2 cursor-pointer  border-white/10 shadow shadow-gray-800 px-5 py-2 rounded-xl hover:brightness-80">Improve Skills <FaAngleRight /> </button>
            </div>
          </section>

          <section className="p-4 bg-gradient-to-r from-[#4c1d95] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 text-white shadow-xl " >
            <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
            <hr  className="text-gray-500 w-100"/>
            <p className="font-bold my-2 text-sm flex gap-2 items-center"><p className="text-lg">▶️</p>Aptitude Test: 72%</p>
            <hr  className="text-gray-500 w-100"/>
            <p className="font-bold my-2 text-sm flex gap-2 items-center text-gray-300"><p className="text-lg">▶️</p>Resume Review: Need more keywords</p>
            <hr  className="text-gray-500 w-100"/>
            <p className="font-bold my-2 text-sm flex gap-2 items-center text-gray-300"><p className="text-lg">▶️</p>Mock Interview: Good communication</p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
