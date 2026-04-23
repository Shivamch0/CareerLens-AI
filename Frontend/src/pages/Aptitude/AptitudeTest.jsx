import { useOutletContext } from "react-router-dom";

import Test from "../../components/Card/Test";
import SideBar from "../../components/Navbar/SideBar";

//Other Imports

const AptitudeTest = () => {
  const context = useOutletContext();
  const timeLeft = context?.timeLeft;

  return (
    <section className="flex gap-10">
      <SideBar />
      <Test type="aptitude" timeLeft={timeLeft} />
    </section>
  );
};

export default AptitudeTest;
