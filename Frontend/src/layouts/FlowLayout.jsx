import { Outlet, useLocation } from "react-router-dom";
import FlowNavbar from "../components/Navbar/FlowNavbar";
import { useState, useEffect } from "react";

const FlowLayout = () => {

   let testType = "";
  const TEST_DURATION = testType === "aptitude" ? 3600 : testType === "interest" ? null : 300;

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!testType) return null;
    const savedEnd = localStorage.getItem(storageKey);

    if (savedEnd) {
      const remaining = Math.floor((savedEnd - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }

    return TEST_DURATION;
  });

  useEffect(() => {
    const existing = localStorage.getItem(storageKey);

    if (!existing) {
      const endTime = Date.now() + TEST_DURATION * 1000;
      localStorage.setItem(storageKey, endTime);
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      const endTime = localStorage.getItem(storageKey);

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

  const storageKey = `${testType}EndTime`;

  if (path.includes("aptitudetest")) {
    testType = "aptitude";
  } else if (path.includes("intereststest")) {
    testType = "interest";
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
