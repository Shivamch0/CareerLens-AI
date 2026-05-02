// Hooks Imports
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Provider/ThemeProvider";
import { loginUser, currentUser } from "../api/auth.api";

// Components Imports
import LinkComponent from "../components/Button/LinkComponent";
import Button from "../components/Button/Button";

// Other Imports
import lightBgImage from "../assets/Light_image.png";

function Login() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const user = await currentUser();

        if (user?.sucess) {
          alert("User already Logged In...");
          navigate("/dashboard");
          return;
        }
        await loginUser();
        navigate("/onboarding");
      } catch (error) {
        await loginUser(values);
        navigate("/onboarding");
      }
    },
  });

  return (
    <div>
      <div className="text-center mt-5">
        <h2
          className={`font-bold text-4xl ${isDark ? "text-white" : "text-blue-800"} `}
        >
          Welcome to CareerLens
        </h2>
        <div
          className={`mt-6 flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center items-center`}
        >
          <LinkComponent
            route="/login"
            content="Log in"
            className={`${isDark ? " text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90" : "bg-blue-500 hover:bg-blue-700"}`}
          />
          <LinkComponent route="/signup" content="Sign up" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-evenly mt-5 p-6 gap-10">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col  gap-5 p-6 mt-8 ${isDark ? "" : "border border-white/20 rounded-lg  shadow-lg shadow-gray-500"}`}
        >
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`pl-5 w-full md:w-96 py-3 rounded-xl ${isDark ? "bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition" : "border border-white/20 placeholder:text-gray-500 shadow-lg shadow-gray-500 outline-0 text-gray-700"} `}
          />
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter your password"
            className={`pl-5 w-full md:w-96 py-3 rounded-xl ${isDark ? "bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition" : "border border-white/20 placeholder:text-gray-500 shadow-lg shadow-gray-500 outline-0 text-gray-700"} `}
          />
          <div
            className={`flex items-center text-sm gap-1 ${isDark ? "text-white" : "text-gray-800"}`}
          >
            <input type="checkbox" name="" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Button
            type="submit"
            title="Submit"
            className={`${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90 py-3 text-white" : "bg-blue-500 py-3 hover:bg-blue-700"}`}
          />
        </form>

        <div className="hidden lg:block">
          <img
            src={lightBgImage}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
