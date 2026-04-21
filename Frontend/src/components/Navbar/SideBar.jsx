import React from "react";
import Section from "../Card/Section";

//Other Imports
import { FaGlobe } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { FaCircleNodes } from "react-icons/fa6";
import { LuGalleryHorizontalEnd } from "react-icons/lu";

const SideBar = () => {
  return (
    <aside >
      <p className="mb-4 ml-4 font-semibold ">Sections</p>
      <div className="space-y-3">
        <Section
          icon={<FaGlobe />}
          content="Logical Reasoning"
          number={7}
          iconColor={`text-blue-400`}
        />

        <Section
          icon={<FaSortNumericUpAlt />}
          content="Numerical Ability"
          number={0}
          iconColor={`text-gray-800`}
        />

        <Section
          icon={<IoIosChatbubbles />}
          content="Verbal Abitity"
          number={0}
          iconColor={`text-yellow-400`}
        />

        <Section
          icon={<FaCircleNodes />}
          content="Analytical Thinking"
          number={0}
          iconColor={`text-orange-400`}
        />

        <Section
          icon={<LuGalleryHorizontalEnd />}
          content="Spatial Ability"
          number={0}
          iconColor={`text-green-400`}
        />
      </div>
    </aside>
  );
};

export default SideBar;
