
// Components Imports
import { ThemeProvider, useTheme } from "../Provider/ThemeProvider"

function ThemeToggleButton(){
  const { theme , toggleTheme , isDark } = useTheme();

  return(
    <button
    onClick={toggleTheme}
    className={`
      relative top-2 w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer
      ${isDark ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-white
          transition-transform duration-300 flex items-center justify-center
          ${isDark ? "transform translate-x-8" : ""}
        `}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </button>
  )
}



function ToggleTheme({isDark}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  )
}

export default ToggleTheme