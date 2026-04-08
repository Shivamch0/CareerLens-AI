// Hooks Import
import { useTheme } from "./Provider/ThemeProvider";

// Conponents Imports
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

// Other Imports
import { Routes, Route } from "react-router-dom";

function App() {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative min-h-screen  overflow-hidden ${isDark ? "bg-[#020617]" : "bg-white"}`}
    >
      {isDark ? (
        <>
          <div
            className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 
        w-[1000px] h-[400px] 
        bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.6),transparent_70%)] 
        blur-[120px] rounded-full"
          ></div>

          <div
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 
        w-[800px] h-[300px] 
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

      <section className="mx-10">
        {/* NAVBAR */}
        <div className="relative z-20 text-white">
          <Navbar />
        </div>

        {/*  PAGES */}
        <main className="relative z-20 text-white mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}

export default App;
