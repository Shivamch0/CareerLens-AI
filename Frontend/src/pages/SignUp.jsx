import { useFormik } from "formik";

// Components Imports
import { useTheme } from "../Provider/ThemeProvider";
import LinkComponent from "../components/LinkComponent";
import Button from "../components/Button";

// Other Imports
import lightBgImage from "../assets/Light_image.png";

function SignUp() {
  const {isDark} = useTheme();
  const {values , handleChange , handleSubmit } = useFormik({
    initialValues: {
      username : "",
      email : "",
      password : ""
    },
    onSubmit: (values) => {
      console.log(values)
    },
  });
  return (
    <div>

      <div className="text-center mt-5">
       <h2 className={`font-bold text-4xl ${isDark ? "text-white" : "text-blue-800"} `}>
          Welcome to CareerLens
        </h2>
        <div className={`mt-6 flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center items-center`}>
          <LinkComponent route="/login" content="Log in" />
          <LinkComponent
            route="/signup"
            content="Sign up"
            className={`${isDark ? " text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90" : "bg-blue-500 hover:bg-blue-700"}`}
          />
        </div>
      </div>

       <div className="flex flex-col lg:flex-row items-center justify-evenly mt-5 p-6 gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col  gap-5 p-4 mt-8">
           <input
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`pl-5 w-full md:w-96 py-3 rounded-xl ${isDark ? "bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition" : 'border border-white/20 placeholder:text-gray-500 shadow-lg shadow-gray-500 outline-0 text-gray-700'} `}
          />
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`pl-5 w-full md:w-96 py-3 rounded-xl ${isDark ? "bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition" : 'border border-white/20 placeholder:text-gray-500 shadow-lg shadow-gray-500 outline-0 text-gray-700'} `}
          />
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="text"
            placeholder="Enter your password"
           className={`pl-5 w-full md:w-96 py-3 rounded-xl ${isDark ? "bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] placeholder:text-[#A8B0D6 outline-none focus:ring-2 focus:ring-[#5B6CFF]/4 transition" : 'border border-white/20 placeholder:text-gray-500 shadow-lg shadow-gray-500 outline-0 text-gray-700'} `}
          />
          <div className={`flex items-center text-sm gap-1 ${isDark ? '' : 'text-gray-800'}`}>
            <input type="checkbox" name="" id="remember" />
            <label htmlFor="remember">Terms & conditions</label>
          </div>
          <Button
            type="submit"
            title="Submit"
            className={`${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90 py-3" : 'bg-blue-500 py-3 hover:bg-blue-700'}`}
          />
        </form>

        <div className="hidden lg:block">
          <img src={lightBgImage} className="w-full max-w-sm md:max-w-md lg:max-w-lg" />
        </div>
      </div>

    </div>
  );
}

export default SignUp;
