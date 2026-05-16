import Section from "../Card/Section";
import { useTheme } from "../../Provider/ThemeProvider";

const SideBar = ({sections}) => {
  const { isDark } = useTheme();

  return (
    <aside className="w-full lg:w-76">
      <div
        className={`rounded-3xl border p-4 ${
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
        }`}
      >
        <p className={`mb-4 text-sm font-bold uppercase tracking-wide ${isDark ? "text-gray-300" : "text-gray-500"}`}>
          Sections
        </p>
        <div className="space-y-3">
          {sections.length > 0 ? (
            sections.map((section) => (
              <Section
                key={section.name}
                icon={section.icon}
                content={section.name}
                number={section.completed}
                total={section.total}
                progress={(section.completed / section.total) * 100}
                progressColor={section.progressColor}
                iconColor={section.iconColor}
              />
            ))
          ) : (
            <p
              className={`rounded-2xl p-4 text-sm font-semibold ${
                isDark ? "bg-white/5 text-gray-300" : "bg-white text-gray-500"
              }`}
            >
              Answer honestly across all prompts. Your selections build the
              interest profile.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
