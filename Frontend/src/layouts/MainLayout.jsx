import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className=" px-4 sm:px-6 md:px-10">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;