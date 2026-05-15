import { Outlet, useLocation } from "react-router-dom";
import FlowNavbar from "../components/Navbar/FlowNavbar";
import { useState, useEffect } from "react";

const FlowLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const [timeLeft, setTimeLeft] = useState(null);
  
  let testType = "";

  if (path.includes("aptitudetest")) {
    testType = "aptitude";
  } else if (path.includes("intereststest")) {
    testType = "interest";
  }

  const TEST_DURATION =
    testType === "aptitude" ? 1800 : testType === "interest" ? 1800 : 300;

  const storageKey = `${testType}EndTime`;

  useEffect(() => {
    if (!testType) return;

    let endTime = localStorage.getItem(storageKey);

    // FIRST TIME TEST START
    if (!endTime) {
      endTime = Date.now() + TEST_DURATION * 1000;

      localStorage.setItem(storageKey, endTime);
    }

    // SET INITIAL TIMER
    const remaining = Math.floor((Number(endTime) - Date.now()) / 1000);

    if(remaining <= 0){
      localStorage.removeItem(storageKey);

      endTime = Date.now() + TEST_DURATION * 1000;

      localStorage.setItem(
        storageKey, 
        String(endTime)
      )
      setTimeLeft(TEST_DURATION);
    }else{
      setTimeLeft(remaining);
    }

  }, [storageKey, TEST_DURATION, testType]);

  useEffect(() => {
    if (!testType) return;

    const timer = setInterval(() => {
      const endTime = localStorage.getItem(storageKey);

      if (!endTime) return;

      const remaining = Math.floor((Number(endTime) - Date.now()) / 1000);

      if (remaining <= 0) {
        location
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [storageKey, testType]);

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
