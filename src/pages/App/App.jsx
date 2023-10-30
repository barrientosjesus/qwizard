import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import QuizzesPage from '../QuizzesPage/QuizzesPage';
import NavBar from '../../components/NavBar/NavBar';
import LandingPage from '../LandingPage/LandingPage';
import QuestionMarkBG from "../../components/QuestionMarkBG/QuestionMarkBG";
import CreateQuizPage from '../CreateQuizPage/CreateQuizPage';
import GamePage from '../GamePage/GamePage';
import DashboardPage from '../DashboardPage/DashboardPage';
import QuizDetailPage from '../QuizDetailPage/QuizDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App bg-base-100 container h-full flex flex-col items-center">
      <NavBar user={user} setUser={setUser} />
      <section className="bg-white lg:grow lg:flex w-full h-full -z-0">
        <QuestionMarkBG />
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/quizzes" element={<QuizzesPage user={user} />} />
          <Route path="/quiz/detail/:quizID" element={<QuizDetailPage user={user} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          {user && (
            <>
              <Route path="/quizzes/create" element={<CreateQuizPage />} />
              <Route path="/lobby/:quizID" element={<GamePage user={user} />} />
              <Route path="/dashboard" element={<DashboardPage user={user} />} />
            </>
          )}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </main>
  );
}
