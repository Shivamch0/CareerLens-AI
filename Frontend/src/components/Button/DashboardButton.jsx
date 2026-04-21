import { useTheme } from "../../Provider/ThemeProvider"

const DashboardButton = ({ title, fn, style , disabled}) => {
  const { isDark } = useTheme()
  return <button
   className={` px-4 py-2 rounded-xl cursor-pointer shadow-[0_4px_14px_rgba(99,102,241,0.5)]  hover:brightness-90 transition-all duration-300 font-bold text-white  ${style ? style : 'bg-blue-500 hover:bg-blue-800 '} `}
   onClick={fn}
   disabled={disabled}
   >{title}</button>;
};

export default DashboardButton;
