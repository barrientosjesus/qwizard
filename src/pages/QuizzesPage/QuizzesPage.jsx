import { useState, useEffect, useRef } from "react";
import QuizCard from "../../components/QuizCard/QuizCard";
import QuizFilter from "../../components/QuizFilter/QuizFilter";
import { getAll, deleteOne } from "../../utilities/quiz-api";

export default function QuizzesPage({ user }) {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const timerIdRef = useRef();

  useEffect(() => {
    async function getQuizzes() {
      const quizzes = await getAll();
      const regex = new RegExp(`.*${filterText}.*`, 'i');
      setQuizzes(quizzes.filter(quiz => regex.test(quiz.title) || regex.test(quiz.description) || regex.test(quiz.category)));
      setIsLoading(false);
    }
    if (filterText === '') {
      getQuizzes();
    } else {
      timerIdRef.current = setTimeout(getQuizzes, 1000);
    }
    return () => clearTimeout(timerIdRef.current);
  }, [filterText]);

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
      <QuizFilter setFilterText={setFilterText} />
      {isLoading ?
        <div className="col-span-12 md:col-span-9 rounded-md m-3 bg-violet-500/90 flex flex-col items-center justify-center shadow-lg">
          <span className="loading loading-dots loading-lg text-white"></span>
        </div>
        :
        <section className="col-span-12 md:col-span-9 rounded-md m-3 bg-violet-500/90 flex flex-wrap content-start justify-center shadow-lg overflow-auto">
          {quizzes.length ? quizzes.map((quiz, index) => (
            <QuizCard quiz={quiz} key={index} user={user} handleDeleteQuiz={handleDeleteQuiz} />
          ))
            :
            <div className="w-full h-full flex justify-center items-center">
              <span className="text-white text-8xl text-center">No Quizzes Available</span>
            </div>
          }
        </section>
      }
    </main>
  );
}