// Hooks Import
import { useNavigate } from "react-router-dom"

// Components Import
import Button from "../components/Button"
import HomeCard from "../components/HomeCard"

//Other Import
import { FaSearch } from "react-icons/fa"
import lightBgImage from "../assets/Light_image.png"


function Home({isDark}) {
  const navigate = useNavigate()
  console.log(isDark)
  return (
    <section>

    <div className="flex">
        <div className="flex flex-col justify-center gap-5">
        <div>
          <h1 className="text-6xl font-bold mb-1">Advance Your Career with AI</h1>
          <p className="text-gray-400">Unlock your potential with AI-Powered tools for job matching, resume optimization and skills development</p>

        </div>
        
        <div className="flex gap-20">
          <Button 
          title="Get Started"
           onClick={() => navigate("/login")} 
           className='px-7 py-3 rounded-xl text-white font-medium  bg-gradient-to-r from-blue-500 to-purple-500  shadow-[0_4px_14px_rgba(99,102,241,0.5)]  hover:brightness-110'
            />
          <Button 
          title='Watch Demo'
           className='px-7 py-3 rounded-xl text-white font-medium border border-white/60 hover:bg-white/10'/>
        </div>
      </div>
      

      <div>
        <img src={lightBgImage} className="w-270 h-110" />
      </div>
    </div>

    <div>
      <HomeCard title='Smart Job Matching' content='' icon={<FaSearch />} />
    </div>

    </section>
  )
}

export default Home