import { Link } from "react-router-dom";
import { useTheme } from "../Provider/ThemeProvider";

function LinkComponent({ className, content, route }) {
  const { isDark } = useTheme();

  const defaultClasses = isDark
    ? "bg-[#121A3A] border border-[#2A356B] text-[#E6E9FF] hover:brightness-150 "
    : "bg-blue-100 border border-blue-300 text-blue-900 hover:brightness-95";

  return (
    <>
      <Link
        to={route}
        className={`px-8 sm:px-12 md:px-15 py-3 rounded-3xl font-bold transition duration-300 ${
          className ? className : defaultClasses
        }`}
      >
        {content}
      </Link>
    </>
  );
}

export default LinkComponent;
