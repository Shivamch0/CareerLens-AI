
// Components Imports
import { ThemeProvider, useTheme } from "../Provider/ThemeProvider"

function ThemeToggleButton(){
  const { theme , ToggleTheme , isDark } = useTheme();

  return(
    <button
    onClick={ToggleTheme}
    className={`
      relative w-16 h-8 rounded-full transition-colors duration-300
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

function ToggleTheme() {
  return (
    <div>
      <ThemeToggleButton/>
    </div>
  )
}

export default ToggleTheme