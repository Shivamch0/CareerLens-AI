import { Outlet, useLocation } from "react-router-dom";
import FlowNavbar from "../components/Navbar/FlowNavbar";

const FlowLayout = () => {
  const location = useLocation();

  const path = location.pathname;

  let testType = "";

  if (path.includes("aptitudetest")) {
    testType = "Aptitude Test";
  } else if (path.includes("intereststest")) {
    testType = "Interest Test";
  }

  return (
    <>
      <FlowNavbar test={testType} />
      <main className="mt-5">
        <Outlet />
      </main>
    </>
  );
};

export default FlowLayout;
