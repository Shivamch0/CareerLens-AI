import Section from "../Card/Section";

const SideBar = ({sections}) => {
  return (
    <aside className="w-full lg:w-76">
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
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
            <p className="rounded-2xl bg-white p-4 text-sm font-semibold text-gray-500">
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
