import { Formik } from "formik";

// Components Imports
import { useTheme } from "../Provider/ThemeProvider";
import LinkComponent from "../components/LinkComponent";
import Button from "../components/Button";

// Other Imports
import lightBgImage from "../assets/Light_image.png";

function SignUp() {
  const {isDark} = useTheme();
  const { handleSubmit } = Formik({
    initialValues: {},
    onSubmit: () => {},
  });
  return (
    <div>

      <div className="text-center mt-10">
        <h2 className={`font-bold text-4xl `}>Welcome to CareerLens</h2>
        <div className={`mt-3 flex gap-15 justify-center`}>
          <LinkComponent route="/login" content="Log in" />
          <LinkComponent
            route="/signup"
            content="Sign up"
            className={`${isDark ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-90" : "bg-blue-500"}`}
          />
        </div>
      </div>


    </div>
  );
}

export default SignUp;
