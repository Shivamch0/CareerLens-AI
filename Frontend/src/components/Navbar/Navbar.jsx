// Hooks Imports
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBookOpen,
  FaBriefcase,
  FaFileAlt,
  FaGraduationCap,
  FaMicrophone,
  FaUser,
} from "react-icons/fa";

import { useTheme } from "../../Provider/ThemeProvider";
import { logout } from "../../Redux State/Slice/authSlice";
import { logoutUser } from "../../api/auth.api.js";
import Button from "../Button/Button";
import logo from "../../assets/Logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      dispatch(logout());
      setOpen(false);
      toast.success(res?.message || "Logged out");

      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const menuItems = [
    { label: "Profile", route: "/profile" },
    { label: "Dashboard", route: "/dashboard" },
    { label: "Settings", route: "/settings" },
    { label: "Skills", route: "/skills" },
    { label: "Resume", route: "/resume" },
    { label: "Interview", route: "/interview" },
    { label: "Help", route: "/help" },
  ];

  return (
    <header className="p-2">
      <Toaster />
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-3xl border px-4 py-3 shadow-sm ${
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
        }`}
      >
        <button
          type="button"
          className="flex items-center"
          onClick={() => navigate("/")}
        >
          <img className="h-11 w-11 rounded-full" src={logo} alt="CareerLens" />
          <span className="text-lg font-bold md:text-2xl">
            <span className="text-blue-600">CAREER</span>
            <span className={isDark ? "text-white" : "text-blue-300"}>
              LENS
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/learning" icon={<FaBookOpen />} label="Learning" isDark={isDark} />
          <NavLink to="/courses" icon={<FaGraduationCap />} label="Courses" isDark={isDark} />
          <NavLink to="/skills" icon={<FaBriefcase />} label="Skills" isDark={isDark} />
          <NavLink to="/interview" icon={<FaMicrophone />} label="Interview" isDark={isDark} />
          <NavLink to="/resume" icon={<FaFileAlt />} label="Resume" isDark={isDark} />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-sm"
                onClick={() => setOpen(!open)}
              >
                {user.userName?.charAt(0).toUpperCase() || <FaUser />}
              </button>

              {open && (
                <div
                  className={`absolute right-0 z-50 mt-2 w-52 rounded-2xl border py-2 text-sm font-semibold shadow-lg ${
                    isDark
                      ? "border-white/10 bg-slate-900 text-white"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        navigate(item.route);
                        setOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left transition ${
                        isDark ? "hover:bg-white/10" : "hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`block w-full px-4 py-2 text-left font-bold text-red-500 transition ${
                      isDark ? "hover:bg-white/10" : "hover:bg-red-50"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              title="Login"
              onClick={() => navigate("/login")}
              className="bg-blue-600 py-2 text-white hover:bg-blue-700"
            />
          )}
        </div>
      </nav>
    </header>
  );
}

const NavLink = ({ to, icon, label, isDark }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold transition ${
      isDark
        ? "text-gray-300 hover:bg-white/10 hover:text-white"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
    }`}
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;
