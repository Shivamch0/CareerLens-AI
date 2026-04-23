 import { useOutletContext } from "react-router-dom";

import Test from "../../components/Card/Test";
import SideBar from "../../components/Navbar/SideBar";

import { FaSearch } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

const InterestTest = () => {
  const context = useOutletContext();
  const timeLeft = context?.timeLeft;

  const sections = [
    {
      name: "Investigative",
      completed: 3,
      total: 5,
      icon: <FaSearch />,
      iconColor: "text-green-500",
      progressColor: "bg-green-500",
    },
    {
      name: "Artistic",
      completed: 0,
      total: 5,
      icon: <FaPalette />,
      iconColor: "text-pink-500",
      progressColor: "bg-pink-500",
    },
    {
      name: "Social",
      completed: 0,
      total: 5,
      icon: <FaUsers />,
      iconColor: "text-blue-500",
      progressColor: "bg-blue-500",
    },
  ];
  return (
    <section className="flex gap-10">
      <SideBar sections={sections} />
      <Test type="interest" timeLeft={timeLeft} />
    </section>
  );
};

export default InterestTest;
