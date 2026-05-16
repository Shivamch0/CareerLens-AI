import { useMemo } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBrain,
  FaBriefcase,
  FaCheckCircle,
  FaEnvelope,
  FaGraduationCap,
  FaSave,
  FaUser,
} from "react-icons/fa";

import { useTheme } from "../Provider/ThemeProvider";
import { changeDetails } from "../api/auth.api";
import { setUser } from "../Redux State/Slice/authSlice";

const careerStages = [
  { value: "", label: "Select career stage" },
  { value: "school", label: "School" },
  { value: "bachelors", label: "Bachelors" },
  { value: "masters", label: "Masters" },
  { value: "graduate", label: "Graduate" },
  { value: "switcher", label: "Career switcher" },
];

function Profile() {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const profileCompletion = useMemo(() => {
    const checks = [
      user?.userName,
      user?.email,
      user?.careerStage,
      user?.education?.degree,
      user?.education?.branch,
      user?.education?.marks,
      user?.interests?.length,
      user?.skills?.length,
    ];

    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [user]);

  const completedTests = [
    user?.onboarding?.aptitudeTestCompleted,
    user?.onboarding?.interestTestCompleted,
  ].filter(Boolean).length;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: user?.userName || "",
      email: user?.email || "",
      careerStage: user?.careerStage || "",
      degree: user?.education?.degree || "",
      branch: user?.education?.branch || "",
      marks: user?.education?.marks || "",
      interests: (user?.interests || []).join(", "),
      skills: (user?.skills || []).join(", "),
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          userName: values.userName,
          email: values.email,
          careerStage: values.careerStage,
          education: {
            degree: values.degree,
            branch: values.branch,
            marks: values.marks,
          },
          interests: toList(values.interests),
          skills: toList(values.skills),
        };

        const response = await changeDetails(payload);
        dispatch(setUser(response.data?.user || response.data));
        toast.success(response.message || "Profile updated successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section
      className={`px-4 pb-10 sm:px-8 md:px-12 lg:px-16 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <Toaster />
      <div className="mx-auto max-w-7xl">
        <div
          className={`rounded-3xl border p-5 shadow-sm sm:p-7 ${
            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-600 text-3xl font-bold text-white">
                {user?.userName?.charAt(0).toUpperCase() || <FaUser />}
              </div>
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                  Profile
                </p>
                <h2 className="text-2xl font-bold sm:text-4xl">
                  {user?.userName || "CareerLens user"}
                </h2>
                <p
                  className={`mt-2 text-sm sm:text-base ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {user?.email || "Add your email"} |{" "}
                  {formatLabel(user?.careerStage) || "Career stage pending"}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryCard
                label="Profile"
                value={`${profileCompletion}%`}
                icon={<FaCheckCircle />}
                isDark={isDark}
              />
              <SummaryCard
                label="Tests"
                value={`${completedTests}/2`}
                icon={<FaBrain />}
                isDark={isDark}
              />
              <SummaryCard
                label="Skills"
                value={user?.skills?.length || 0}
                icon={<FaBriefcase />}
                isDark={isDark}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={formik.handleSubmit}
            className={`rounded-3xl border p-5 shadow-sm sm:p-7 ${
              isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
            }`}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Account details</h3>
                <p
                  className={`mt-1 text-sm ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Keep your career profile current for better recommendations.
                </p>
              </div>
              <FaUser className="text-blue-600" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Username"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                icon={<FaUser />}
                isDark={isDark}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                icon={<FaEnvelope />}
                isDark={isDark}
              />
              <SelectField
                label="Career stage"
                name="careerStage"
                value={formik.values.careerStage}
                onChange={formik.handleChange}
                isDark={isDark}
              />
              <Field
                label="Degree"
                name="degree"
                value={formik.values.degree}
                onChange={formik.handleChange}
                icon={<FaGraduationCap />}
                isDark={isDark}
              />
              <Field
                label="Branch"
                name="branch"
                value={formik.values.branch}
                onChange={formik.handleChange}
                icon={<FaGraduationCap />}
                isDark={isDark}
              />
              <Field
                label="Marks"
                name="marks"
                value={formik.values.marks}
                onChange={formik.handleChange}
                placeholder="CGPA, percentage, or grade"
                icon={<FaGraduationCap />}
                isDark={isDark}
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <TextArea
                label="Interests"
                name="interests"
                value={formik.values.interests}
                onChange={formik.handleChange}
                placeholder="Design, coding, finance"
                isDark={isDark}
              />
              <TextArea
                label="Skills"
                name="skills"
                value={formik.values.skills}
                onChange={formik.handleChange}
                placeholder="React, communication, Excel"
                isDark={isDark}
              />
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <FaSave />
              {formik.isSubmitting ? "Saving..." : "Save Profile"}
            </button>
          </form>

          <div className="space-y-5">
            <InfoPanel title="Education" icon={<FaGraduationCap />} isDark={isDark}>
              <InfoRow label="Degree" value={user?.education?.degree} isDark={isDark} />
              <InfoRow label="Branch" value={user?.education?.branch} isDark={isDark} />
              <InfoRow label="Marks" value={user?.education?.marks} isDark={isDark} />
            </InfoPanel>

            <InfoPanel title="Interests" icon={<FaBrain />} isDark={isDark}>
              <TagList items={user?.interests} empty="No interests added yet" isDark={isDark} />
            </InfoPanel>

            <InfoPanel title="Skills" icon={<FaBriefcase />} isDark={isDark}>
              <TagList items={user?.skills} empty="No skills added yet" isDark={isDark} />
            </InfoPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

const Field = ({ label, icon, isDark, ...props }) => (
  <label className="block">
    <span
      className={`mb-2 block text-sm font-bold ${
        isDark ? "text-gray-200" : "text-gray-700"
      }`}
    >
      {label}
    </span>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
        {icon}
      </span>
      <input
        {...props}
        className={`w-full rounded-2xl border py-3 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
          isDark
            ? "border-white/10 bg-white/5 text-white placeholder:text-gray-400"
            : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
        }`}
      />
    </div>
  </label>
);

const SelectField = ({ label, isDark, ...props }) => (
  <label className="block">
    <span
      className={`mb-2 block text-sm font-bold ${
        isDark ? "text-gray-200" : "text-gray-700"
      }`}
    >
      {label}
    </span>
    <select
      {...props}
      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
        isDark
          ? "border-white/10 bg-slate-900 text-white"
          : "border-gray-200 bg-gray-50 text-gray-900"
      }`}
    >
      {careerStages.map((stage) => (
        <option key={stage.value} value={stage.value}>
          {stage.label}
        </option>
      ))}
    </select>
  </label>
);

const TextArea = ({ label, isDark, ...props }) => (
  <label className="block">
    <span
      className={`mb-2 block text-sm font-bold ${
        isDark ? "text-gray-200" : "text-gray-700"
      }`}
    >
      {label}
    </span>
    <textarea
      {...props}
      rows="4"
      className={`w-full resize-none rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
        isDark
          ? "border-white/10 bg-white/5 text-white placeholder:text-gray-400"
          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
      }`}
    />
    <p className={`mt-2 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
      Separate items with commas.
    </p>
  </label>
);

const SummaryCard = ({ label, value, icon, isDark }) => (
  <div
    className={`rounded-2xl border px-4 py-3 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
    }`}
  >
    <div className="mb-2 text-blue-600">{icon}</div>
    <p className={`text-xs font-bold uppercase ${isDark ? "text-gray-300" : "text-gray-500"}`}>
      {label}
    </p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const InfoPanel = ({ title, icon, children, isDark }) => (
  <section
    className={`rounded-3xl border p-5 shadow-sm ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
    }`}
  >
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-bold">{title}</h3>
      <span className="text-blue-600">{icon}</span>
    </div>
    {children}
  </section>
);

const InfoRow = ({ label, value, isDark }) => (
  <div
    className={`flex items-center justify-between gap-4 border-b py-3 last:border-b-0 ${
      isDark ? "border-white/10" : "border-gray-200/70"
    }`}
  >
    <span className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-500"}`}>
      {label}
    </span>
    <span className="text-right text-sm font-bold">{value || "Not added"}</span>
  </div>
);

const TagList = ({ items = [], empty, isDark }) => {
  if (!items.length) {
    return <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{empty}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const toList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const formatLabel = (value) => {
  if (!value) return "";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default Profile;
