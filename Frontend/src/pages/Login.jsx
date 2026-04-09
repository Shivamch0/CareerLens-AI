// Hooks Imports
import { Formik } from "formik";
import { Link } from "react-router-dom";

// Components Imports
import { useTheme } from "../Provider/ThemeProvider";
import LinkComponent from "../components/LinkComponent";
import Button from "../components/Button";

// Other Imports
import lightBgImage from "../assets/Light_image.png";

function Login() {
  const { isDark } = useTheme();
  const { handleSubmit } = Formik({
    initialValues: {},
    onSubmit: () => {},
  });

  return (
    <div>
      <div className="text-center mt-10">
        <h2 className={`font-bold text-4xl ${isDark ? '' : 'text-blue-800'} `}>Welcome to CareerLens</h2>
        <div className={`mt-3 flex gap-15 justify-center`}>
          <LinkComponent
            route="/login"
            content="Log in"
            className={`${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90" : "bg-blue-500"}`}
          />
          <LinkComponent route="/signup" content="Sign up" />
        </div>
      </div>

      <div className="flex justify-evenly mt-5 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col  gap-5 p-4 mt-8">
          <input
            type="text"
            placeholder="Enter your email"
            className="pl-5 pr-35 py-3 rounded-xl bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition"
          />
          <input
            type="text"
            placeholder="Enter your password"
            className="pl-5 pr-35 py-3 rounded-xl bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition"
          />
          <div className="flex items-center text-sm gap-1">
            <input type="checkbox" name="" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Button
            title="Submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90 py-3"
          />
        </form>

        <div>
          <img src={lightBgImage} className="w-150 h-90" />
        </div>
      </div>
    </div>
  );
}

export default Login;
