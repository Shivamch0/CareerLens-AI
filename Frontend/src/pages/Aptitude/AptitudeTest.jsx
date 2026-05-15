import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import Test from "../../components/Card/Test";
import SideBar from "../../components/Navbar/SideBar";

import { aptitudeQuestions } from "../../api/test.api.js";

// Other Imports
import { FaGlobe } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";

const AptitudeTest = () => {
  const context = useOutletContext();

  const timeLeft = context?.timeLeft;

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const savedQuestions = localStorage.getItem("Aptitude_Questions");

        // CHECK CACHE
        if (savedQuestions) {
          const parsed = JSON.parse(savedQuestions);

          const now = Date.now();

          // VALID CACHE
          if (
            parsed.data &&
            Array.isArray(parsed.data) &&
            now < parsed.expiry
          ) {
            console.log("Using cached aptitude questions");

            setQuestions(parsed.data);

            setLoading(false);

            return;
          }

          // CACHE EXPIRED
          localStorage.removeItem("Aptitude_Questions");
        }

        // API CALL
        console.log("Fetching aptitude questions...");

        const response = await aptitudeQuestions();

        const data = response.data.data;

        setQuestions(data);

        // SAVE CACHE
        const ONE_DAY = 24 * 60 * 60 * 1000;

        const questionsData = {
          data,
          expiry: Date.now() + ONE_DAY,
        };

        localStorage.setItem(
          "Aptitude_Questions",
          JSON.stringify(questionsData),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const sections = [
    {
      name: "Logical Reasoning",
      completed: 0,
      total: 10,
      icon: <FaGlobe />,
      iconColor: "text-blue-400",
      progressColor: "bg-blue-400",
    },
    {
      name: "Numerical Ability",
      completed: 0,
      total: 10,
      icon: <FaSortNumericUpAlt />,
      iconColor: "text-gray-800",
      progressColor: "bg-gray-800",
    },
  ];

  // LOADING
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <section className="flex gap-10">
      <SideBar sections={sections} />

      <Test type="aptitude" timeLeft={timeLeft} questions={questions} />
    </section>
  );
};

export default AptitudeTest;
