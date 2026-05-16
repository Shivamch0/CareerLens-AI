import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import { useTheme } from "../Provider/ThemeProvider";
import { registerUser } from "../api/auth.api.js";
import Button from "../components/Button/Button";
import lightBgImage from "../assets/Light_image.png";

function SignUp() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await registerUser(values);
        toast.success(res.message || "Account created successfully");

        setTimeout(() => {
          navigate("/login");
        }, 700);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="px-4 py-6 sm:px-8">
      <Toaster />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div
          className={`rounded-3xl border p-6 shadow-sm ${
            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
          }`}
        >
          <img
            src={lightBgImage}
            alt="career planning"
            className="mx-auto max-h-96 object-contain"
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Profile", "Interests", "Roadmap"].map((item) => (
              <div
                key={item}
                className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                  isDark ? "bg-white/5 text-white" : "bg-white text-gray-700"
                }`}
              >
                <FaCheckCircle className="mb-2 text-green-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${
            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
          }`}
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
            Get started
          </p>
          <h2
            className={`text-3xl font-bold sm:text-4xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Create your CareerLens account
          </h2>
          <p
            className={`mt-3 text-sm leading-6 ${
              isDark ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Build your profile, complete guided assessments, and receive a
            practical career roadmap.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Field
              label="Username"
              name="userName"
              type="text"
              value={values.userName}
              onChange={handleChange}
              placeholder="Your name"
              isDark={isDark}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              isDark={isDark}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Create a password"
              isDark={isDark}
            />

            <label
              className={`flex items-start gap-2 text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <input type="checkbox" className="mt-1 h-4 w-4 accent-blue-600" />
              I agree to use CareerLens for assessment and career guidance.
            </label>

            <Button
              type="submit"
              disabled={isSubmitting}
              title={isSubmitting ? "Creating account..." : "Create account"}
              icon={<FaArrowRight />}
              className="flex w-full items-center justify-center gap-2 bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p
              className={`text-center text-sm ${
                isDark ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-600">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

const Field = ({ label, isDark, ...props }) => (
  <label className="block">
    <span
      className={`mb-2 block text-sm font-bold ${
        isDark ? "text-gray-200" : "text-gray-700"
      }`}
    >
      {label}
    </span>
    <input
      {...props}
      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
        isDark
          ? "border-white/10 bg-white/5 text-white placeholder:text-gray-400"
          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
      }`}
    />
  </label>
);

export default SignUp;
