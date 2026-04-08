// Hooks Imports
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Provider/ThemeProvider";

// Components Imports
import Button from "./Button";
import ToggleTheme from "./ToggleTheme";

//Other Imports
import logo from "../assets/logo.png";


function Navbar() {
  const navigate = useNavigate();
  const { theme , toggleTheme , isDark} = useTheme()

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <header className="  mt-4 p-2">
      <nav className="flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleNavigate}
        >
          <img className="w-12 h-12 rounded-full" src={logo} alt="" />
          <h3 className="text-2xl font-bold text-blue-600">CAREER</h3>
          <p className={`text-2xl font-bold ${isDark ? "" : "text-blue-300"} `}>LENS</p>
        </div>
        <div className={`flex gap-10 py-1 px-4 rounded-full text-sm text-gray-400 ${isDark ? "bg-white/10 border-white/20" : "bg-gray-300"}`}>
          <Link
            to={"/learning"}
            className={`relative py-2 px-3 font-bold transform duration-300 hover:text-lg ${isDark ? "hover:text-gray-200" : "text-blue-800"}`}  
          >
            Learning
          </Link>
          <Link
            to={"/courses"}
            className={`relative py-2 px-3 font-bold transform duration-300 hover:text-lg ${isDark ? "hover:text-gray-200" : "text-blue-800"}`}
          >
            Courses
          </Link>
          <Link
            to={"/skills"}
            className={`relative py-2 px-3 font-bold transform duration-300 hover:text-lg ${isDark ? "hover:text-gray-200" : "text-blue-800"}`}
          >
            Skills
          </Link>
          <Link
            to={"/interview"}
            className={`relative py-2 px-3 font-bold transform duration-300 hover:text-lg ${isDark ? "hover:text-gray-200" : "text-blue-800"}`}
          >
            Interview
          </Link>
          <Link
            to={"/resume"}
            className={`relative py-2 px-3 font-bold transform duration-300 hover:text-lg ${isDark ? "hover:text-gray-200" : "text-blue-800"}`}
          >
            Resume
          </Link>
        </div>

        <div className="flex gap-5 items-center">
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
