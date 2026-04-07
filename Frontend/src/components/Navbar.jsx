// Hooks Imports
import { Link, useNavigate } from "react-router-dom";

// Components Imports
import Button from "./Button";
import ToggleTheme from "./ToggleTheme";

//Other Imports
import logo from "../assets/logo.png";


function Navbar() {
  const navigate = useNavigate();

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
          <p className="text-2xl font-bold ">LENS</p>
        </div>
        <div className="flex gap-10 bg-white/10 border-white/20 py-1 px-4 rounded-full text-sm text-gray-400 ">
          <Link
            to={"/learning"}
            className="relative py-2 px-3 transform hover:text-gray-200  duration-300 hover:text-lg"
          >
            Learning
          </Link>
          <Link
            to={"/courses"}
            className=" py-2 px-3 transform hover:text-gray-200 duration-300 hover:text-lg"
          >
            Courses
          </Link>
          <Link
            to={"/skills"}
            className=" py-2 px-3 transform hover:text-gray-200  duration-300 hover:text-lg"
          >
            Skills
          </Link>
          <Link
            to={"/interview"}
            className=" py-2 px-3 transform hover:text-gray-200  duration-300 hover:text-lg"
          >
            Interview
          </Link>
          <Link
            to={"/resume"}
            className=" py-2 px-3 transform hover:text-gray-200  duration-300 hover:text-lg"
          >
            Resume
          </Link>
        </div>

        <div className="flex gap-5">
          <Button title="Get Started" onClick={() => navigate("/login")} />
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
