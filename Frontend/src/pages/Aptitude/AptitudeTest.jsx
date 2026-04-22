import Test from "../../components/Card/Test"
import SideBar from "../../components/Navbar/SideBar"

//Other Imports


const AptitudeTest = () => {
  return (
    <section className="flex gap-10">
     <SideBar />
     <Test type="Aptitude Test"/>
    </section>
  )
}

export default AptitudeTest