import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBriefcase,
  FaCheckCircle,
  FaDownload,
  FaFileAlt,
  FaLightbulb,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUpload,
  FaUserGraduate,
} from "react-icons/fa";

import { useTheme } from "../Provider/ThemeProvider";
import {
  analyzeResume as analyzeResumeApi,
  getLatestResume,
  saveResume,
  uploadResume,
} from "../api/resume.api";

const initialResume = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: "",
  education: [{ school: "", degree: "", year: "" }],
  experience: [{ role: "", company: "", duration: "", details: "" }],
  projects: [{ name: "", tech: "", details: "" }],
};

function Resume() {
  const { isDark } = useTheme();
  const [resume, setResume] = useState(initialResume);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [remoteAnalysis, setRemoteAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [analysisError, setAnalysisError] = useState("");

  const generatedResumeText = useMemo(() => buildResumeText(resume), [resume]);
  const analyzedText = resumeText.trim() || generatedResumeText;
  const localAnalysis = useMemo(() => analyzeResumeLocally(analyzedText), [analyzedText]);
  const analysis = remoteAnalysis || localAnalysis;
  const suggestionCount = analysis.groups.reduce(
    (total, group) => total + (group.suggestions?.length || 0),
    0,
  );

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await getLatestResume();
        const savedResume = response.data;

        if (!savedResume) return;

        if (savedResume.generatedResume) {
          setResume(normalizeResume(savedResume.generatedResume));
        }

        if (savedResume.extractedText) {
          setResumeText(savedResume.extractedText);
        }

        if (savedResume.analysis?.groups?.length) {
          setRemoteAnalysis({
            score: savedResume.analysis.score || 0,
            groups: savedResume.analysis.groups,
            targetRole: savedResume.analysis.targetRole || "",
            usedFallback: Boolean(savedResume.analysis.usedFallback),
          });
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          toast.error(error.response?.data?.message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const updateField = (field, value) => {
    setResume((current) => ({ ...current, [field]: value }));
  };

  const updateListItem = (section, index, field, value) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addListItem = (section, item) => {
    setResume((current) => ({
      ...current,
      [section]: [...current[section], item],
    }));
  };

  const removeListItem = (section, index) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadError("");
      setUploadedFile(file);
      const response = await uploadResume(file, (progressEvent) => {
        if (!progressEvent.total) return;

        setUploadProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total),
        );
      });
      const extractedText = response.data?.extractedText || "";

      setResumeText(extractedText);
      setResume((current) => mergeParsedResume(current, parseResumeText(extractedText)));
      setRemoteAnalysis(null);
      toast.success(response.message || "Resume uploaded and parsed");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setUploadedFile(null);
      setUploadError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await saveResume(resume);
      setResumeText(response.data?.extractedText || generatedResumeText);
      toast.success(response.message || "Resume saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAnalyze = async () => {
    if (!analyzedText.trim()) {
      toast.error("Add resume content before analyzing");
      return;
    }

    try {
      setAnalyzing(true);
      setAnalysisError("");
      const response = await analyzeResumeApi({
        resumeText: analyzedText,
        targetRole: resume.title,
      });

      setRemoteAnalysis({
        score: response.data?.score || 0,
        groups: response.data?.groups || [],
        targetRole: response.data?.targetRole || resume.title,
        usedFallback: Boolean(response.data?.usedFallback),
      });
      toast.success(
        response.data?.usedFallback
          ? "AI was unavailable, so a rule-based analysis was used"
          : response.message || "Resume analyzed successfully",
      );
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setAnalysisError(message);
      toast.error(message);
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadResume = async () => {
    try {
      setDownloading(true);
      const [{ pdf }, { default: ResumePdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../components/Resume/ResumePdf"),
      ]);
      const blob = await pdf(<ResumePdf resume={resume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${slugify(resume.name || "career-lens")}-resume.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.message || "Unable to generate PDF");
    } finally {
      setDownloading(false);
    }
  };

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
                Resume workspace
              </p>
              <h2 className="text-2xl font-bold sm:text-4xl">
                Create, upload, and improve your resume
              </h2>
              <p
                className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Build a resume from scratch or analyze an existing one for
                structure, clarity, keywords, and missing sections.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Metric
                label="Resume score"
                value={`${analysis.score}%`}
                icon={<FaCheckCircle />}
                isDark={isDark}
              />
              <Metric
                label="Suggestions"
                value={suggestionCount}
                icon={<FaLightbulb />}
                isDark={isDark}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Panel title="Build from scratch" icon={<FaFileAlt />} isDark={isDark}>
              {loading && (
                <p className={`mb-4 text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  Loading saved resume...
                </p>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name" value={resume.name} onChange={(value) => updateField("name", value)} isDark={isDark} />
                <Field label="Target role" value={resume.title} onChange={(value) => updateField("title", value)} isDark={isDark} />
                <Field label="Email" value={resume.email} onChange={(value) => updateField("email", value)} isDark={isDark} />
                <Field label="Phone" value={resume.phone} onChange={(value) => updateField("phone", value)} isDark={isDark} />
                <Field label="Location" value={resume.location} onChange={(value) => updateField("location", value)} isDark={isDark} />
                <Field label="Skills" value={resume.skills} onChange={(value) => updateField("skills", value)} placeholder="React, Node.js, SQL" isDark={isDark} />
              </div>

              <TextArea
                label="Professional summary"
                value={resume.summary}
                onChange={(value) => updateField("summary", value)}
                placeholder="2-3 lines about your strengths, domain, and goals"
                isDark={isDark}
              />

              <ResumeSection
                title="Experience"
                icon={<FaBriefcase />}
                items={resume.experience}
                isDark={isDark}
                onAdd={() =>
                  addListItem("experience", {
                    role: "",
                    company: "",
                    duration: "",
                    details: "",
                  })
                }
                onRemove={(index) => removeListItem("experience", index)}
                renderItem={(item, index) => (
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Role" value={item.role} onChange={(value) => updateListItem("experience", index, "role", value)} isDark={isDark} />
                    <Field label="Company" value={item.company} onChange={(value) => updateListItem("experience", index, "company", value)} isDark={isDark} />
                    <Field label="Duration" value={item.duration} onChange={(value) => updateListItem("experience", index, "duration", value)} isDark={isDark} />
                    <div className="md:col-span-3">
                      <TextArea label="Impact bullets" value={item.details} onChange={(value) => updateListItem("experience", index, "details", value)} placeholder="Improved load time by 30%, built API..." isDark={isDark} />
                    </div>
                  </div>
                )}
              />

              <ResumeSection
                title="Projects"
                icon={<FaSearch />}
                items={resume.projects}
                isDark={isDark}
                onAdd={() => addListItem("projects", { name: "", tech: "", details: "" })}
                onRemove={(index) => removeListItem("projects", index)}
                renderItem={(item, index) => (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Project name" value={item.name} onChange={(value) => updateListItem("projects", index, "name", value)} isDark={isDark} />
                    <Field label="Tech stack" value={item.tech} onChange={(value) => updateListItem("projects", index, "tech", value)} isDark={isDark} />
                    <div className="md:col-span-2">
                      <TextArea label="Project details" value={item.details} onChange={(value) => updateListItem("projects", index, "details", value)} placeholder="What it does, your role, measurable outcome" isDark={isDark} />
                    </div>
                  </div>
                )}
              />

              <ResumeSection
                title="Education"
                icon={<FaUserGraduate />}
                items={resume.education}
                isDark={isDark}
                onAdd={() => addListItem("education", { school: "", degree: "", year: "" })}
                onRemove={(index) => removeListItem("education", index)}
                renderItem={(item, index) => (
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="School / college" value={item.school} onChange={(value) => updateListItem("education", index, "school", value)} isDark={isDark} />
                    <Field label="Degree" value={item.degree} onChange={(value) => updateListItem("education", index, "degree", value)} isDark={isDark} />
                    <Field label="Year / marks" value={item.year} onChange={(value) => updateListItem("education", index, "year", value)} isDark={isDark} />
                  </div>
                )}
              />

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <FaCheckCircle />
                {saving ? "Saving..." : "Save Resume"}
              </button>
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel title="Upload and analyze" icon={<FaUpload />} isDark={isDark}>
              <div
                className={`mb-4 grid gap-3 rounded-3xl border p-4 sm:grid-cols-3 ${
                  isDark ? "border-white/10 bg-white/5" : "border-blue-100 bg-blue-50"
                }`}
              >
                <StatusStep label="Upload" active={uploading} done={Boolean(resumeText)} isDark={isDark} />
                <StatusStep label="Auto-fill" active={uploading} done={Boolean(resumeText)} isDark={isDark} />
                <StatusStep label="Analyze" active={analyzing} done={Boolean(remoteAnalysis)} isDark={isDark} />
              </div>

              <label
                className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center transition ${
                  isDark
                    ? "border-white/20 bg-white/5 hover:bg-white/10"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <FaUpload className="mb-3 text-2xl text-blue-600" />
                <span className="font-bold">
                  {uploadedFile ? uploadedFile.name : "Upload resume"}
                </span>
                <span className={`mt-1 text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  TXT, PDF, and DOCX files are parsed on the backend.
                </span>
                {uploading && (
                  <span className="mt-2 text-sm font-bold text-blue-600">
                    Uploading and extracting text... {uploadProgress}%
                  </span>
                )}
                {uploading && (
                  <span className={`mt-3 h-2 w-full max-w-sm overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                    <span
                      className="block h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </span>
                )}
                <input
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
              {uploadError && (
                <InlineNotice tone="error" isDark={isDark}>
                  {uploadError}
                </InlineNotice>
              )}
              {resumeText && !uploadError && (
                <InlineNotice tone="success" isDark={isDark}>
                  Resume text is ready. CareerLens also filled the builder fields it could detect.
                </InlineNotice>
              )}

              <TextArea
                label="Resume text for analysis"
                value={resumeText}
                onChange={setResumeText}
                placeholder="Paste your existing resume content here..."
                rows={8}
                isDark={isDark}
              />

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSearch />
                {analyzing ? "Analyzing..." : "Analyze with AI"}
              </button>
              {analyzing && (
                <InlineNotice tone="info" isDark={isDark}>
                  Analyzing your resume. If AI is unavailable, CareerLens will use the built-in resume checks.
                </InlineNotice>
              )}
              {analysisError && (
                <InlineNotice tone="error" isDark={isDark}>
                  {analysisError}
                </InlineNotice>
              )}
            </Panel>

            <Panel title="Analysis" icon={<FaSearch />} isDark={isDark}>
              <div
                className={`mb-5 rounded-3xl border p-5 ${
                  isDark ? "border-white/10 bg-slate-950/40" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span>Resume strength</span>
                  <span>{analysis.score}%</span>
                </div>
                <div className={`h-4 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                  <div
                    className={`h-full rounded-full transition-all ${
                      analysis.score >= 75
                        ? "bg-green-500"
                        : analysis.score >= 50
                          ? "bg-blue-600"
                          : "bg-amber-500"
                    }`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
                <p className={`mt-3 text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {analysis.score >= 75
                    ? "Strong foundation. Polish the high-priority suggestions."
                    : analysis.score >= 50
                      ? "Good start. A few targeted changes can lift this quickly."
                      : "Needs structure and clearer proof of skills before applying."}
                </p>
              </div>

              {remoteAnalysis?.usedFallback && (
                <InlineNotice tone="warning" isDark={isDark}>
                  AI analysis was unavailable, so this report uses rule-based resume checks.
                </InlineNotice>
              )}
              {remoteAnalysis?.targetRole && (
                <InlineNotice tone="info" isDark={isDark}>
                  Analysis target role: {remoteAnalysis.targetRole}
                </InlineNotice>
              )}
              <div className="space-y-3">
                {analysis.groups.map((group) => (
                  <AnalysisGroup key={group.category} group={group} isDark={isDark} />
                ))}
              </div>
            </Panel>

            <Panel title="Preview" icon={<FaFileAlt />} isDark={isDark}>
              <pre
                className={`max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl border p-4 text-sm leading-6 ${
                  isDark
                    ? "border-white/10 bg-slate-950/70 text-gray-100"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                {generatedResumeText || "Start filling the form to preview your resume."}
              </pre>
              <button
                type="button"
                onClick={downloadResume}
                disabled={downloading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaDownload />
                {downloading ? "Generating PDF..." : "Download PDF Resume"}
              </button>
            </Panel>
          </div>
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

const Metric = ({ label, value, icon, isDark }) => (
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

const StatusStep = ({ label, active, done, isDark }) => (
  <div
    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
      done
        ? isDark
          ? "border-green-400/30 bg-green-500/10 text-green-100"
          : "border-green-100 bg-green-50 text-green-800"
        : active
          ? isDark
            ? "border-blue-400/30 bg-blue-500/10 text-blue-100"
            : "border-blue-100 bg-white text-blue-800"
          : isDark
            ? "border-white/10 bg-white/5 text-gray-300"
            : "border-gray-200 bg-white text-gray-600"
    }`}
  >
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
        done ? "bg-green-600 text-white" : active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      {done ? <FaCheckCircle /> : active ? <FaSearch /> : <FaFileAlt />}
    </span>
    <span className="text-sm font-bold">{label}</span>
  </div>
);

const InlineNotice = ({ children, tone = "info", isDark }) => {
  const tones = {
    info: isDark
      ? "border-blue-400/30 bg-blue-500/10 text-blue-100"
      : "border-blue-100 bg-blue-50 text-blue-800",
    success: isDark
      ? "border-green-400/30 bg-green-500/10 text-green-100"
      : "border-green-100 bg-green-50 text-green-800",
    warning: isDark
      ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
      : "border-amber-100 bg-amber-50 text-amber-800",
    error: isDark
      ? "border-red-400/30 bg-red-500/10 text-red-100"
      : "border-red-100 bg-red-50 text-red-800",
  };

  return (
    <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold ${tones[tone]}`}>
      {children}
    </div>
  );
};

const Field = ({ label, value, onChange, isDark, placeholder = "" }) => (
  <label className="block">
    <span className={`mb-2 block text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
      {label}
    </span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
        isDark
          ? "border-white/10 bg-white/5 text-white placeholder:text-gray-400"
          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
      }`}
    />
  </label>
);

const TextArea = ({
  label,
  value,
  onChange,
  isDark,
  placeholder = "",
  rows = 4,
}) => (
  <label className="mt-4 block">
    <span className={`mb-2 block text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
      {label}
    </span>
    <textarea
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`w-full resize-none rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
        isDark
          ? "border-white/10 bg-white/5 text-white placeholder:text-gray-400"
          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
      }`}
    />
  </label>
);

const ResumeSection = ({
  title,
  icon,
  items,
  renderItem,
  onAdd,
  onRemove,
  isDark,
}) => (
  <div className="mt-6">
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold">
        <span className="text-blue-600">{icon}</span>
        {title}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700"
      >
        <FaPlus />
        Add
      </button>
    </div>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-2xl border p-4 ${
            isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="mb-3 flex justify-end">
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600"
              >
                <FaTrash />
                Remove
              </button>
            )}
          </div>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  </div>
);

const AnalysisGroup = ({ group, isDark }) => (
  <div
    className={`rounded-2xl border p-4 ${
      isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
    }`}
  >
    <div className="mb-3 flex items-center justify-between gap-4">
      <h4 className="font-bold">{group.category}</h4>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
        {group.score || 0}%
      </span>
    </div>
    <div className="space-y-3">
      {(group.suggestions || []).map((item) => (
        <Suggestion key={`${group.category}-${item.title}`} item={item} isDark={isDark} />
      ))}
    </div>
  </div>
);

const Suggestion = ({ item, isDark }) => (
  <div
    className={`rounded-2xl border p-4 ${
      item.done === true
        ? "border-green-200 bg-green-50 text-green-800"
        : item.priority === "High"
          ? isDark
            ? "border-red-400/30 bg-red-500/10 text-red-100"
            : "border-red-200 bg-red-50 text-red-800"
          : isDark
          ? "border-white/10 bg-white/5 text-gray-200"
          : "border-amber-200 bg-amber-50 text-amber-800"
    }`}
  >
    <div className="flex items-start gap-3">
      <span className="mt-1">{item.done ? <FaCheckCircle /> : <FaLightbulb />}</span>
      <div>
        <p className="font-bold">{item.title}</p>
        <p className="mt-1 text-sm leading-5">
          {item.improvement || item.detail}
        </p>
        {item.issue && (
          <p className="mt-2 text-xs font-semibold opacity-80">{item.issue}</p>
        )}
      </div>
    </div>
  </div>
);

const buildResumeText = (resume) => {
  const lines = [
    resume.name,
    resume.title,
    [resume.email, resume.phone, resume.location].filter(Boolean).join(" | "),
    "",
    resume.summary && "SUMMARY",
    resume.summary,
    "",
    resume.skills && "SKILLS",
    resume.skills,
    "",
    "EXPERIENCE",
    ...resume.experience.flatMap((item) =>
      [item.role || item.company ? `${item.role} - ${item.company}` : "", item.duration, item.details, ""].filter(
        Boolean,
      ),
    ),
    "PROJECTS",
    ...resume.projects.flatMap((item) =>
      [item.name, item.tech, item.details, ""].filter(Boolean),
    ),
    "EDUCATION",
    ...resume.education.flatMap((item) =>
      [[item.degree, item.school, item.year].filter(Boolean).join(" | "), ""].filter(Boolean),
    ),
  ];

  return lines.filter((line, index) => line || lines[index - 1]).join("\n").trim();
};

const parseResumeText = (text) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const email = text.match(/[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] || "";
  const phone = text.match(/(?:\+?\d[\d\s().-]{8,}\d)/)?.[0]?.trim() || "";
  const name = lines.find((line) => !line.includes("@") && !/\d{5,}/.test(line)) || "";
  const title = lines.find((line, index) => index > 0 && !line.includes("@") && !/\d{5,}/.test(line) && !isSectionHeading(line)) || "";

  return {
    name,
    title,
    email,
    phone,
    summary: extractSection(text, ["summary", "profile", "objective"]),
    skills: extractSection(text, ["skills", "technical skills", "core skills"])
      .split(/\n|,|•|-/)
      .map((skill) => skill.trim())
      .filter((skill) => skill && skill.length < 40)
      .slice(0, 20)
      .join(", "),
    experience: sectionToItems(extractSection(text, ["experience", "work experience", "employment"])),
    projects: sectionToItems(extractSection(text, ["projects", "project experience"])).map((item) => ({
      name: item.role,
      tech: "",
      details: item.details,
    })),
    education: parseEducation(extractSection(text, ["education", "academic", "academics"])),
  };
};

const mergeParsedResume = (current, parsed) => ({
  ...current,
  name: current.name || parsed.name,
  title: current.title || parsed.title,
  email: current.email || parsed.email,
  phone: current.phone || parsed.phone,
  summary: current.summary || parsed.summary,
  skills: current.skills || parsed.skills,
  experience: hasUsefulList(current.experience)
    ? current.experience
    : parsed.experience.length
      ? parsed.experience
      : current.experience,
  projects: hasUsefulList(current.projects)
    ? current.projects
    : parsed.projects.length
      ? parsed.projects
      : current.projects,
  education: hasUsefulList(current.education)
    ? current.education
    : parsed.education.length
      ? parsed.education
      : current.education,
});

const extractSection = (text, names) => {
  const lines = text.split(/\r?\n/);
  const startIndex = lines.findIndex((line) =>
    names.some((name) => normalizeHeading(line) === normalizeHeading(name)),
  );

  if (startIndex === -1) return "";

  const body = [];

  for (const line of lines.slice(startIndex + 1)) {
    if (body.length && isSectionHeading(line)) break;
    if (line.trim()) body.push(line.trim());
  }

  return body.join("\n").trim();
};

const sectionToItems = (sectionText) => {
  if (!sectionText) return [];

  return sectionText
    .split(/\n(?=[A-Z][^\n]{2,80})/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((chunk) => {
      const [firstLine, ...details] = chunk.split(/\n/);

      return {
        role: firstLine || "",
        company: "",
        duration: "",
        details: details.join("\n") || firstLine || "",
      };
    });
};

const parseEducation = (sectionText) => {
  if (!sectionText) return [];

  return sectionText
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((line) => ({
      school: line,
      degree: "",
      year: line.match(/\b(20\d{2}|19\d{2})\b/)?.[0] || "",
    }));
};

const hasUsefulList = (items) =>
  items?.some((item) =>
    Object.values(item).some((value) => typeof value === "string" && value.trim()),
  );

const isSectionHeading = (line) => {
  const heading = normalizeHeading(line);
  return [
    "summary",
    "profile",
    "objective",
    "skills",
    "technical skills",
    "core skills",
    "experience",
    "work experience",
    "employment",
    "projects",
    "project experience",
    "education",
    "academic",
    "academics",
    "certifications",
    "achievements",
  ].includes(heading);
};

const normalizeHeading = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const analyzeResumeLocally = (text) => {
  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const checks = [
    {
      title: "Contact details",
      done: /[\w.-]+@[\w.-]+\.\w+/.test(text) && /\d{10,}/.test(text.replace(/\D/g, "")),
      detail: "Add a professional email and phone number near the top.",
    },
    {
      title: "Professional summary",
      done: lower.includes("summary") || wordCount > 80,
      detail: "Add a short summary that states your target role and strongest skills.",
    },
    {
      title: "Skills section",
      done: lower.includes("skills") || /(react|node|python|java|sql|excel|communication)/i.test(text),
      detail: "Include a clear skills section with tools, languages, and soft skills.",
    },
    {
      title: "Experience or projects",
      done: lower.includes("experience") || lower.includes("project"),
      detail: "Show practical work through internships, jobs, projects, or freelance work.",
    },
    {
      title: "Measurable impact",
      done: /\b\d+%|\b\d+\+|\b\d+x|\b\d+ users|\b\d+ projects/i.test(text),
      detail: "Use numbers where possible, such as performance gains, users, marks, or project counts.",
    },
    {
      title: "Education",
      done: lower.includes("education") || /(degree|bachelor|master|school|college|university)/i.test(text),
      detail: "Add your education details with degree, institution, and year or marks.",
    },
    {
      title: "Right length",
      done: wordCount >= 180 && wordCount <= 750,
      detail: "Aim for a focused one-page resume with enough detail, usually 180-750 words.",
    },
  ];

  const doneCount = checks.filter((check) => check.done).length;

  return {
    score: Math.round((doneCount / checks.length) * 100),
    groups: [
      {
        category: "Content",
        score: Math.round((doneCount / checks.length) * 100),
        suggestions: checks,
      },
    ],
  };
};

const normalizeResume = (resume) => ({
  ...initialResume,
  ...resume,
  education: resume.education?.length ? resume.education : initialResume.education,
  experience: resume.experience?.length
    ? resume.experience
    : initialResume.experience,
  projects: resume.projects?.length ? resume.projects : initialResume.projects,
});

export default Resume;
