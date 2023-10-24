import { useState, useEffect } from "react";
import QuizCard from "../../components/QuizCard/QuizCard";
import QuizFilter from "../../components/QuizFilter/QuizFilter";
import { getAll } from "../../utilities/quiz-api";

export default function OrderHistoryPage({ user }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function getQuizzes() {
      const quizzes = await getAll();
      setQuizzes(quizzes);
    }
    getQuizzes();
  }, []);


  return (
    <main className="z-20 w-full grid grid-cols-12">
      <QuizFilter />
      <section className="col-span-9 rounded-md m-3 bg-violet-500">
        {quizzes.length ? quizzes.map((quiz, index) => (
          <QuizCard quiz={quiz} key={index} user={user} />
        ))
      :
        <h2>No Quizzes Created</h2>
      }
      </section>
    </main>
  );
}