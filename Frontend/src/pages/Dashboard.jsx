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

function Dashboard() {
  const { isDark } = useTheme();
  return (
    <section>
      <h3>Welcome,Shivam👋</h3>
      <p>B.Tech CSE | 4th Year</p>

      <div>
        <p>Skils: 5 | Test: 2 | Match Score: 78%</p>

        <div className="flex gap-5 justify-around">
          <StatsCard
            content="Profile Completion"
            percentage="85"
            image={greenIcon}
          />
          <StatsCard
            content="Aptitude Score"
            percentage="72"
            image={blueIcon}
          />
          <StatsCard
            content="Resume Strength"
            percentage="68"
            image={redIcon}
          />
        </div>

        <div className="grid grid-cols-2 my-2 gap-10">
          <section className="bg-red-500 flex p-4 ">
            <div>
              <h4>Recommended Carrer</h4>
              <h3>Software Developer</h3>
              <h5>Match : 85%</h5>
              <p>Strong coding & analytical skills</p>
              <button>View Roadmap</button>
            </div>
            
              <img src={youngMan} className=" w-90 relative left-13" />
           
          </section>
          <div className="grid grid-cols-3 gap-5">
            <SuggestionCard image={clipboard} content='Take Aptitude Test' buttonText='Start Test'/>
            <SuggestionCard image={notes} content='Analyze Resume' buttonText='Upload Resume' />
            <SuggestionCard image={micIcon} content='AI Mock Interview' buttonText='Start Interview' />
          </div>
        </div>

        <div className="flex justify-around">
          <section></section>
          <section></section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
