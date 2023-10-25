import { useState, useEffect } from "react";
import QuizCard from "../../components/QuizCard/QuizCard";
import QuizFilter from "../../components/QuizFilter/QuizFilter";
import { getAll, deleteOne } from "../../utilities/quiz-api";

export default function QuizzesPage({ user }) {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getQuizzes() {
      const quizzes = await getAll();
      setQuizzes(quizzes);
      setIsLoading(false);
    }
    getQuizzes();
    console.log('test')
  }, []);

  async function handleDeleteQuiz(quizId) {
    console.log("Before deleteOne");
    await deleteOne(quizId);
    console.log("After deleteOne");

    const updatedQuizzes = await getAll();
    console.log(updatedQuizzes);
    setQuizzes(updatedQuizzes);

  }


  return (
    <main className="z-20 w-full grid grid-cols-12">
      <QuizFilter />
      {isLoading ?
        <div className="col-span-9 rounded-md m-3 bg-violet-500 flex flex-col items-center justify-center">
          <span className="loading loading-dots loading-lg text-white"></span>
        </div>
        :
        <section className="col-span-9 rounded-md m-3 bg-violet-500 flex flex-wrap content-start">
          {quizzes.length ? quizzes.map((quiz, index) => (
            <QuizCard quiz={quiz} key={index} user={user} handleDeleteQuiz={handleDeleteQuiz} />
          ))
            :
            <span className="text-white text-8xl">No Quizzes Created</span>
          }
        </section>
      }
    </main>
  );
}