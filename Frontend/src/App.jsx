// Hooks Import
import { useTheme } from "./Provider/ThemeProvider";

// Conponents Imports
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding/Onboarding"
import Interests from "./pages/Onboarding/Interests"
import Journey from "./pages/Onboarding/Journey"
import FinalOnboarding from "./pages/Onboarding/FinalOnboarding"

// Other Imports
import { Routes, Route } from "react-router-dom";

function App() {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#020617]" : "bg-white"}`}
    >
      {isDark ? (
        <>
          <div
            className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 
        w-[500px] sm:w-[700px] md:w-[900px] lg:w-[1000px]
h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] 
        bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.6),transparent_70%)] 
        blur-[120px] rounded-full"
          ></div>

          <div
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 
        w-[400px] sm:w-[600px] md:w-[700px] lg:w-[800px]
h-[150px] sm:h-[220px] md:h-[260px] lg:h-[300px] 
        bg-purple-500/30 blur-[100px] rounded-full"
          ></div>

          <div
            className="absolute inset-0 
        bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent"
          ></div>
        </>
      ) : (
        ""
      )}

      <section className="px-0 sm:px-6 md:px-10">
        {/* NAVBAR */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/*  PAGES */}
        <main className="relative z-20 mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/onboarding-journey" element={<Journey />} />
            <Route path="/onboarding-interests" element={<Interests />} />
            <Route path="onboarding-final" element={<FinalOnboarding />} />

          </Routes>
        </main>
      </section>
    </div>
  );
}

export default App;
