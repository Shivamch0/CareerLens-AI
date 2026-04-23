import { Outlet, useLocation } from "react-router-dom";
import FlowNavbar from "../components/Navbar/FlowNavbar";
import { useState, useEffect } from "react";

const FlowLayout = () => {
  const TEST_DURATION = 300; // seconds

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEnd = localStorage.getItem("testEndTime");

    if (savedEnd) {
      const remaining = Math.floor((savedEnd - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }

    return TEST_DURATION;
  });

  useEffect(() => {
    const existing = localStorage.getItem("testEndTime");

    if (!existing) {
      const endTime = Date.now() + TEST_DURATION * 1000;
      localStorage.setItem("testEndTime", endTime);
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      const endTime = localStorage.getItem("testEndTime");

      if (!endTime) return;

      const remaining = Math.floor((endTime - Date.now()) / 1000);

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
