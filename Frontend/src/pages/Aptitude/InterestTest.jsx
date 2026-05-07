 import { useOutletContext } from "react-router-dom";
 import { useState , useEffect } from "react";
 import { interestQuestions } from '../../api/test.api.js'
import Test from "../../components/Card/Test";
import SideBar from "../../components/Navbar/SideBar";

import { FaSearch } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


const InterestTest = () => {
  const context = useOutletContext();
  const timeLeft = context?.timeLeft;

  const [questions , setQuestions] = useState([]);

  const [loading , setLoading] = useState(true)
 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await interestQuestions();
        console.log(response)
        const data = response.data

        setQuestions(data);

        localStorage.setItem("Interest_Questions" , JSON.stringify(data));
        
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    fetchQuestions();
  } , [])

  return (
    <section className="flex gap-10">
      <SideBar sections={[]} />
      <Test type="interest" timeLeft={timeLeft} questions={questions} />
    </section>
  );
};

export default InterestTest;
