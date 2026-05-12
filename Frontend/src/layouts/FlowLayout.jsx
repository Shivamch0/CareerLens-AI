import { Outlet, useLocation } from "react-router-dom";
import FlowNavbar from "../components/Navbar/FlowNavbar";
import { useState, useEffect } from "react";

const FlowLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  
  let testType = "";

  if (path.includes("aptitudetest")) {
    testType = "Aptitude";
  } else if (path.includes("intereststest")) {
    testType = "Interest";
  }

  const TEST_DURATION =
    testType === "Aptitude" ? 1800 : testType === "Interest" ? 1800 : 300;

  const storageKey = `${testType}EndTime`;

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!testType) return null;
    const savedEnd = localStorage.getItem(storageKey);

    if (savedEnd) {
      const remaining = Math.floor((Number(savedEnd) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }

    return TEST_DURATION;
  });

  useEffect(() => {
    if (!testType) return;

    const existing = localStorage.getItem(storageKey);

    if (!existing) {
      const endTime = Date.now() + TEST_DURATION * 1000;
      localStorage.setItem(storageKey, endTime);
    }
  }, []);

  useEffect(() => {
    if (!testType) return;

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
