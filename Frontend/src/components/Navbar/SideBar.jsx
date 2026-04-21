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
    <aside>
      <p className="mb-4">Sections</p>
      <Section icon={<FaGlobe />} content="Logical Reasoning" number={7} />

      <Section icon={<FaSortNumericUpAlt />} content="Numerical Ability" number={0} />

      <Section icon={<IoIosChatbubbles />} content="Verbal Abitity" number={0} />

      <Section icon={<FaCircleNodes />} content="Analytical Thinking" number={0} />

      <Section icon={<LuGalleryHorizontalEnd />} content="Spatial Ability" number={0} />
    </aside>
  );
};

export default SideBar;
