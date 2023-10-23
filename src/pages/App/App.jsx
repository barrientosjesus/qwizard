import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import QuizzesPage from '../QuizzesPage/QuizzesPage';
import NavBar from '../../components/NavBar/NavBar';
import LandingPage from '../LandingPage/LandingPage';
import QuestionMarkBG from "../../components/QuestionMarkBG/QuestionMarkBG";
import CreateQuizPage from '../CreateQuizPage/CreateQuizPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App bg-base-100 container h-full flex flex-col items-center">
      <NavBar user={user} setUser={setUser} />
      <section className="bg-white lg:grow lg:flex w-full -z-0">
        <QuestionMarkBG />
        <Routes>
          {/* Route components in here */}
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/quizzes/create" element={<CreateQuizPage />} />
        </Routes>
      </section>
    </main>
  );
}
