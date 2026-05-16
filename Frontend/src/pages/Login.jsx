// Hooks Imports
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import { useTheme } from "../Provider/ThemeProvider";
import { loginUser } from "../api/auth.api";
import { setUser } from "../Redux State/Slice/authSlice";
import Button from "../components/Button/Button";
import lightBgImage from "../assets/Light_image.png";

function Login() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await loginUser(values);
        const user = res.data.user;

        dispatch(setUser(user));
        toast.success(res.message || "Logged in successfully");

        setTimeout(() => {
          if (!user.onboarding?.journeyCompleted) {
            navigate("/onboarding-journey");
          } else if (!user.onboarding?.interestsCompleted) {
            navigate("/onboarding-interests");
          } else {
            navigate("/aptitude/assessment");
          }
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
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div
          className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${
            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
          }`}
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
            Welcome back
          </p>
          <h2
            className={`text-3xl font-bold sm:text-4xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Continue building your career clarity
          </h2>
          <p
            className={`mt-3 text-sm leading-6 ${
              isDark ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Sign in to continue assessments, review your dashboard, and track
            personalized career recommendations.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              placeholder="Enter your password"
              isDark={isDark}
            />

            <div
              className={`flex items-center justify-between gap-4 text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                Remember me
              </label>
              <Link className="font-bold text-blue-600" to="/signup">
                Create account
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              title={isSubmitting ? "Signing in..." : "Sign in"}
              icon={<FaArrowRight />}
              className="flex w-full items-center justify-center gap-2 bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </form>
        </div>

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
            {["Assess", "Analyze", "Grow"].map((item) => (
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

export default Login;
