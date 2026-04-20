// Hooks Import
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Provider/ThemeProvider";

// Components Import
import Button from "../components/Button"
import HomeCard from "../components/HomeCard"

//Other Import
import { FaSearch  , FaLightbulb } from "react-icons/fa"
import { FaNoteSticky  } from "react-icons/fa6"
import lightBgImage from "../assets/Light_image.png"


function Home() {
  const navigate = useNavigate();
  const {isDark} = useTheme()
  return (
    <section >

    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-4 md:px-10">
        <div className="flex flex-col justify-center gap-5">
        <div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 ${isDark ? 'text-white' : 'text-blue-800'}`}>Advance Your Career with AI</h1>
          <p className={`font-bold text-sm sm:text-base md:text-lg ${isDark ? "text-gray-400" : 'text-gray-900'}`}>Unlock your potential with AI-Powered tools for job matching, resume optimization and skills development</p>

        </div>
        
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
          <Button 
          title="Get Started"
           onClick={() => navigate("/login")} 
           className={`px-7 py-3 rounded-xl font-medium text-white transiton duration-300  ${isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-blue-500'}  shadow-[0_4px_14px_rgba(99,102,241,0.5)]  hover:brightness-90 `}
            />
          <Button 
          title='Watch Demo'
          onClick={() => navigate('/onboarding')}
           className={`px-7 py-3 rounded-xl font-medium border  ${isDark ? 'text-white border-white/60 hover:bg-white/10' : 'text-gray-700 bg-white border-black/20 hover:bg-black/10'}`}/>
        </div>
      </div>
      

      <div className="hidden lg:block">
        <img src={lightBgImage} className="w-full max-w-md md:max-w-lg lg:max-w-3xl" />
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-6 mt-14 md:mt-10 px-2 md:px-10">
      <HomeCard title='Smart Job Matching' content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, quis.' icon={<FaSearch />} />
      <HomeCard title='Resume Optimization' content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, quis.' icon={<FaNoteSticky />} />
      <HomeCard title='Skill Development' content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, quis.' icon={<FaLightbulb />} />
    </div>

    </section>
  )
}

export default Home
