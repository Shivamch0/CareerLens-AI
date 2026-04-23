import React from "react";
import Section from "../Card/Section";



const SideBar = ({sections}) => {
  return (
    <aside >
      <p className="mb-4 ml-4 font-semibold ">Sections</p>
      <div className="space-y-3">
        {sections.map((section) => (
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
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
