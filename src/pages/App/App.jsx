import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import LandingPage from '../LandingPage/LandingPage';
import QuestionMarkBG from "../../components/QuestionMarkBG/QuestionMarkBG";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App bg-base-100 container h-full flex flex-col items-center">
      <NavBar user={user} setUser={setUser} />
      <section className="bg-white lg:grow lg:flex lg:items-center -z-0">
        <QuestionMarkBG />
        <Routes>
          {/* Route components in here */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
        </Routes>
      </section>
    </main>
  );
}
