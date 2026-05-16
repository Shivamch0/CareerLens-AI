import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

import { interestQuestions } from "../../api/test.api.js";

import Test from "../../components/Card/Test";
import SideBar from "../../components/Navbar/SideBar";

const InterestTest = () => {
  const context = useOutletContext();

  const timeLeft = context?.timeLeft;

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const savedQuestions = localStorage.getItem("Interest_Questions");

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

            setQuestions(parsed.data);

            setLoading(false);

            return;
          }

          localStorage.removeItem("Interest_Questions");
        }

        const response = await interestQuestions();

        const data = response.data;

        setQuestions(data);

        // SAVE CACHE
        const ONE_DAY = 24 * 60 * 60 * 1000;

        const questionsData = {
          data,
          expiry: Date.now() + ONE_DAY,
        };

        localStorage.setItem(
          "Interest_Questions",
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

  // LOADING
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 lg:flex-row">
      <SideBar sections={[]} />

      <Test type="interest" timeLeft={timeLeft} questions={questions} />
    </section>
  );
};

export default InterestTest;
