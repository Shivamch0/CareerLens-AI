  import { useOutletContext } from "react-router-dom";

  import Test from "../../components/Card/Test";
  import SideBar from "../../components/Navbar/SideBar";

  //Other Imports
  import { FaGlobe } from "react-icons/fa";
  import { FaSortNumericUpAlt } from "react-icons/fa";

  const AptitudeTest = () => {
    const context = useOutletContext();
    const timeLeft = context?.timeLeft;

    const sections = [
      {
        name: "Logical Reasoning",
        completed: 7,
        total: 25,
        icon: <FaGlobe />,
        iconColor: "text-blue-400",
        progressColor: "bg-blue-400",
      },
      {
        name: "Numerical Ability",
        completed: 0,
        total: 10,
        icon: <FaSortNumericUpAlt />,
        iconColor: "text-gray-800",
        progressColor: "bg-gray-800",
      },
    ];

    return (
      <section className="flex gap-10">
        <SideBar sections={sections}/>
        <Test type="aptitude" timeLeft={timeLeft} />
      </section>
    );
  };

  export default AptitudeTest;
