// Hooks Imports
import { useTheme } from "../Provider/ThemeProvider"

// Components Imports
import StatsCard from "../components/StatsCard"
import ActivityCard from "../components/ActivityCard"
import SuggestionCard from "../components/SuggestionCard"

// Other Imports
import blueIcon from "../assets/blue_icon.png"
import clipboard from "../assets/clipboard.png"
import greenIcon from "../assets/green_icon.png"
import micIcon from "../assets/mic-icon.png"
import notes from "../assets/notes.png"
import redIcon from "../assets/red_icon.png"
import youngMan from "../assets/young_man.png"

function Dashboard() {
  const { isDark } = useTheme()
  return (
    <section>
      <h3>Welcome,Shivam👋</h3>
      <p>B.Tech CSE | 4th Year</p>

      <div>

        <p>Skils: 5 | Test: 2 | Match Score: 78%</p>

        <div className="flex gap-1 justify-around">
          <StatsCard content='Profile Completion' percentage='85' image={greenIcon} />
          <StatsCard content='Aptitude Score' percentage='72' image={blueIcon} />
          <StatsCard content='Resume Strength' percentage='68' image={redIcon} />
        </div>

        <div className="flex justify-around">
          <ActivityCard />
          <div className="flex justify-between gap-10">
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </div>
        </div>

        <div className="flex justify-around">
          <ActivityCard />
          <ActivityCard />
        </div>

      </div>
    </section>
  )
}

export default Dashboard