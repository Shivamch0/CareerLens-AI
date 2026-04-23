import { Outlet, useLocation } from "react-router-dom";
import FlowNavbar from "../components/Navbar/FlowNavbar";
import { useState , useEffect } from "react";

const FlowLayout = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5s

  const location = useLocation();

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // auto submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const path = location.pathname;

  let testType = "";

  if (path.includes("aptitudetest")) {
    testType = "Aptitude Test";
  } else if (path.includes("intereststest")) {
    testType = "Interest Test";
  }

  return (
    <>
      <FlowNavbar test={testType} timeLeft={timeLeft} />
      <main className="mt-5">
        <Outlet context={{ timeLeft }} />
      </main>
    </>
  );
};

export default FlowLayout;
