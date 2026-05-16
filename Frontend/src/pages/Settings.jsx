import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBell,
  FaBrain,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMoon,
  FaShieldAlt,
  FaSun,
  FaUserCog,
} from "react-icons/fa";

import { useTheme } from "../Provider/ThemeProvider";
import { changePassword } from "../api/auth.api";

function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const [showPasswords, setShowPasswords] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [assessmentReminders, setAssessmentReminders] = useState(true);

  const passwordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (values.newPassword !== values.confirmPassword) {
        toast.error("New password and confirmation do not match");
        setSubmitting(false);
        return;
      }

      if (values.newPassword.length < 6) {
        toast.error("New password must be at least 6 characters");
        setSubmitting(false);
        return;
      }

      try {
        const response = await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });

        toast.success(response.message || "Password changed successfully");
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const completedTests = [
    user?.onboarding?.aptitudeTestCompleted,
    user?.onboarding?.interestTestCompleted,
  ].filter(Boolean).length;

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
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Settings
              </p>
              <h2 className="text-2xl font-bold sm:text-4xl">
                Manage your account preferences
              </h2>
              <p
                className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Control appearance, password security, and the reminders that
                keep your CareerLens workspace tidy.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <StatusCard
                label="Account"
                value={user?.email ? "Active" : "Guest"}
                icon={<FaUserCog />}
                isDark={isDark}
              />
              <StatusCard
                label="Assessments"
                value={`${completedTests}/2 done`}
                icon={<FaBrain />}
                isDark={isDark}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <Panel title="Appearance" icon={<FaMoon />} isDark={isDark}>
              <div
                className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    {isDark ? <FaMoon /> : <FaSun />}
                  </div>
                  <div>
                    <p className="font-bold">{isDark ? "Dark mode" : "Light mode"}</p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Switch the app appearance.
                    </p>
                  </div>
                </div>
                <Toggle checked={isDark} onClick={toggleTheme} />
              </div>
            </Panel>

            <Panel title="Notifications" icon={<FaBell />} isDark={isDark}>
              <SettingSwitch
                title="Email alerts"
                description="Get important account and recommendation updates."
                checked={emailAlerts}
                onChange={() => setEmailAlerts((value) => !value)}
                isDark={isDark}
              />
              <SettingSwitch
                title="Assessment reminders"
                description="Show reminders when your assessment flow is incomplete."
                checked={assessmentReminders}
                onChange={() => setAssessmentReminders((value) => !value)}
                isDark={isDark}
              />
            </Panel>

            <Panel title="Account Status" icon={<FaCheckCircle />} isDark={isDark}>
              <InfoRow label="Username" value={user?.userName} isDark={isDark} />
              <InfoRow label="Email" value={user?.email} isDark={isDark} />
              <InfoRow
                label="Career stage"
                value={formatLabel(user?.careerStage)}
                isDark={isDark}
              />
              <InfoRow label="Tests completed" value={`${completedTests}/2`} isDark={isDark} />
            </Panel>
          </div>

          <Panel title="Security" icon={<FaShieldAlt />} isDark={isDark}>
            <form onSubmit={passwordForm.handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">Change password</h3>
                  <p
                    className={`mt-1 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Use a strong password that you do not reuse elsewhere.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswords((value) => !value)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                    isDark
                      ? "border-white/10 bg-white/5 hover:bg-white/10"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                  title={showPasswords ? "Hide passwords" : "Show passwords"}
                >
                  {showPasswords ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <PasswordField
                label="Current password"
                name="oldPassword"
                value={passwordForm.values.oldPassword}
                onChange={passwordForm.handleChange}
                show={showPasswords}
                isDark={isDark}
              />
              <PasswordField
                label="New password"
                name="newPassword"
                value={passwordForm.values.newPassword}
                onChange={passwordForm.handleChange}
                show={showPasswords}
                isDark={isDark}
              />
              <PasswordField
                label="Confirm new password"
                name="confirmPassword"
                value={passwordForm.values.confirmPassword}
                onChange={passwordForm.handleChange}
                show={showPasswords}
                isDark={isDark}
              />

              <button
                type="submit"
                disabled={passwordForm.isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <FaLock />
                {passwordForm.isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </section>
  );
}

const Panel = ({ title, icon, children, isDark }) => (
  <section
    className={`rounded-3xl border p-5 shadow-sm sm:p-6 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
    }`}
  >
    <div className="mb-5 flex items-center justify-between">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="text-blue-600">{icon}</span>
    </div>
    {children}
  </section>
);

const StatusCard = ({ label, value, icon, isDark }) => (
  <div
    className={`rounded-2xl border px-4 py-3 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
    }`}
  >
    <div className="mb-2 text-blue-600">{icon}</div>
    <p
      className={`text-xs font-bold uppercase ${
        isDark ? "text-gray-300" : "text-gray-500"
      }`}
    >
      {label}
    </p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

const Toggle = ({ checked, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
      checked ? "justify-end bg-blue-600" : "justify-start bg-gray-300"
    }`}
  >
    <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
  </button>
);

const SettingSwitch = ({ title, description, checked, onChange, isDark }) => (
  <div
    className={`mb-3 flex items-center justify-between gap-4 rounded-2xl border p-4 last:mb-0 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
    }`}
  >
    <div>
      <p className="font-bold">{title}</p>
      <p className={`mt-1 text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
        {description}
      </p>
    </div>
    <Toggle checked={checked} onClick={onChange} />
  </div>
);

const PasswordField = ({ label, show, isDark, ...props }) => (
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
        <FaLock />
      </span>
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`w-full rounded-2xl border py-3 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
          isDark
            ? "border-white/10 bg-white/5 text-white placeholder:text-gray-400"
            : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
        }`}
      />
    </div>
  </label>
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

const formatLabel = (value) => {
  if (!value) return "";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default Settings;
