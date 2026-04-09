// Hooks Imports
import { useTheme } from "../Provider/ThemeProvider"

// Components Imports
import StatsCard from "../components/StatsCard"
import ActivityCard from "../components/ActivityCard"
import SuggestionCard from "../components/SuggestionCard"

// Other Imports

function Dashboard() {
  const { isDark } = useTheme()
  return (
    <section>
      <h3>Welcome,Shivam👋</h3>
      <p>B.Tech CSE | 4th Year</p>

      <div>

        <p>Skils: 5 | Test: 2 | Match Score: 78%</p>

        <div>
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>

        <div>
          <ActivityCard />
          <div>
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </div>
        </div>

        <div>
          <ActivityCard />
          <ActivityCard />
        </div>

      </div>
    </section>
  )
}

export default Dashboard