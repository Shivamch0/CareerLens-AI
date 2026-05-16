import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaCheck,
  FaGraduationCap,
  FaLightbulb,
  FaRoute,
} from "react-icons/fa";

import { getCareerRecommendations } from "../../api/test.api";

const Response = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const aptitude = user?.aptitudeTest;
  const interest = user?.interestTest;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getCareerRecommendations();
        setRecommendations(response.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to generate recommendations right now.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const categoryScores = useMemo(() => {
    return Object.entries(aptitude?.categoryScores || {}).map(
      ([name, score]) => ({
        name,
        score,
      }),
    );
  }, [aptitude]);

  const strengths = useMemo(() => {
    const aptitudeStrengths = categoryScores
      .filter((category) => category.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((category) => category.name);

    return [
      interest?.dominantInterest,
      ...aptitudeStrengths,
      aptitude?.percentage >= 70 ? "Strong assessment accuracy" : null,
    ].filter(Boolean);
  }, [aptitude, categoryScores, interest]);

  const skillGaps = useMemo(() => {
    const lowCategories = categoryScores
      .filter((category) => category.score <= 1)
      .map((category) => `Practice ${category.name}`);

    return [
      ...lowCategories,
      aptitude?.percentage < 70 ? "Improve timed problem solving" : null,
      "Build 2-3 portfolio projects for your top career option",
    ].filter(Boolean);
  }, [aptitude, categoryScores]);

  const nextActions = [
    "Shortlist the top two recommendations and compare their roadmaps.",
    "Spend one week strengthening the lowest aptitude category.",
    "Create a small project or certificate plan for your preferred path.",
  ];

  const topRecommendation = recommendations[0];

  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-600">
                Career insights
              </p>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
                Your assessment report is ready
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                We combined your interests, aptitude performance, and education
                profile to suggest practical next steps.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-80">
              <SummaryStat
                label="Aptitude"
                value={`${aptitude?.percentage || 0}%`}
                icon={<FaChartLine />}
              />
              <SummaryStat
                label="Interest"
                value={interest?.dominantInterest || "Mapped"}
                icon={<FaLightbulb />}
              />
            </div>
          </div>

          {loading && (
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm font-semibold text-blue-700">
              Generating your personalized career recommendations...
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              {error} You can still review your assessment summary below.
            </div>
          )}

          {topRecommendation && (
            <div className="mt-8 rounded-2xl bg-gray-900 p-5 text-white sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-300">
                    Best match
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">
                    {topRecommendation.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
                    {topRecommendation.reason}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-center">
                  <p className="text-3xl font-bold">
                    {topRecommendation.suitabilityPercentage}%
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-300">
                    Suitability
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Suggested roles and paths
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ranked by fit with your current profile.
                </p>
              </div>
              <FaBriefcase className="text-blue-600" />
            </div>

            <div className="space-y-4">
              {(recommendations.length ? recommendations : fallbackRoles).map(
                (item) => (
                  <RecommendationCard key={item.title} item={item} />
                ),
              )}
            </div>
          </div>

          <div className="space-y-5">
            <InsightPanel
              title="Strengths"
              icon={<FaCheck />}
              items={strengths.length ? strengths : ["Interest profile mapped"]}
              tone="green"
            />
            <InsightPanel
              title="Skill gaps"
              icon={<FaGraduationCap />}
              items={skillGaps}
              tone="amber"
            />
            <InsightPanel
              title="Next actions"
              icon={<FaRoute />}
              items={nextActions}
              tone="blue"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Keep building momentum</h3>
            <p className="mt-1 text-sm text-gray-500">
              Use this report as your first roadmap, then revisit it as your
              skills grow.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Go to Dashboard <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

const fallbackRoles = [
  {
    title: "Career Explorer",
    type: "career",
    suitabilityPercentage: 70,
    reason: "Complete recommendation generation to see your personalized match.",
    roadmap: ["Review your interests", "Compare career paths", "Build core skills"],
  },
];

const SummaryStat = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
      {icon}
    </div>
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className="mt-1 truncate text-lg font-bold text-gray-900">{value}</p>
  </div>
);

const RecommendationCard = ({ item }) => (
  <article className="rounded-2xl border border-gray-200 p-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-gray-900">{item.title}</h4>
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold capitalize text-blue-700">
            {item.type}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500">{item.reason}</p>
      </div>
      <span className="shrink-0 rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
        {item.suitabilityPercentage}%
      </span>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {(item.roadmap || []).slice(0, 4).map((step) => (
        <span
          key={step}
          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
        >
          {step}
        </span>
      ))}
    </div>
  </article>
);

const InsightPanel = ({ title, icon, items, tone }) => {
  const tones = {
    green: "bg-green-50 text-green-700 border-green-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${tones[tone]}`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-5 text-gray-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Response;
