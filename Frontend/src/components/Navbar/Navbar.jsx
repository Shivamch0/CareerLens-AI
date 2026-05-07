// Hooks Imports
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Provider/ThemeProvider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { logout } from "../../Redux State/Slice/authSlice";
import { logoutUser } from "../../api/auth.api.js";

// Components Imports
import Button from "../Button/Button";

//Other Imports
import logo from "../../assets/Logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  const user = useSelector((state) => state.auth.user);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      dispatch(logout());
      setOpen(false);

      toast.success(res?.message || "User logout ")
      setTimeout(() => {
        navigate("/login");
      } , 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  };

  return (
    <>
      <header className=" p-2">
        <Toaster />
        <nav className="flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleNavigate}
          >
            <img className="w-12 h-12 rounded-full" src={logo} alt="" />
            <h3 className="text-lg md:text-2xl font-bold text-blue-600">
              CAREER
            </h3>
            <p
              className={`text-lg md:text-2xl font-bold ${isDark ? "text-white" : "text-blue-300"} `}
            >
              LENS
            </p>
          </div>
          <div
            className={`hidden md:flex gap-6 lg:gap-10 py-1 px-4 rounded-full text-sm text-gray-400 ${isDark ? "bg-white/10 border-white/20" : "bg-gray-300"}`}
          >
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
            {user ? (
              <div className="relative" ref={menuRef}>
                <div
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {user.userName?.charAt(0).toUpperCase()}
                </div>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-400 text-white font-semibold shadow-lg rounded-lg py-2 z-50">
                    <div
                      onClick={() => navigate("/profile")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Profile
                    </div>

                    <div
                      onClick={() => navigate("/dashboard")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Dashboard
                    </div>

                    <div
                      onClick={() => navigate("/settings")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Settings
                    </div>

                    <div
                      onClick={() => navigate("/skills")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Skills
                    </div>

                    <div
                      onClick={() => navigate("/resume")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Resume
                    </div>

                    <div
                      onClick={() => navigate("/interview")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Interview
                    </div>

                    <div
                      onClick={() => navigate("/help")}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Help
                    </div>

                    {/* 🔥 Logout */}
                    <div
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                title="Login"
                onClick={() => navigate("/login")}
                className={``}
              />
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
