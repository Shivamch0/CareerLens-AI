import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden">

      <div className="absolute bottom-30 left-1/2 -translate-x-1/2 
        w-250 h-100 
        bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.6),transparent_70%)] 
        blur-[120px] rounded-full">
      </div>

      <div className="absolute bottom-25 left-1/2 -translate-x-1/2 
        w200 h-75
        bg-purple-500/30 blur-[100px] rounded-full">
      </div>

      <div className="absolute inset-0 
        bg-linear-to-b from-[#020617] via-[#020617]/80 to-transparent">
      </div>

      <section>
        <div className="relative z-20 text-white">
        <Navbar />
      </div>
      <div className="relative z-10  text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      </section>
    </div>
  );
}

export default App;