import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate('/')
  }

  return (
    <div className="navbar bg-violet-500 shadow-md rounded-lg z-10" data-theme="qwizard">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to="/quizzes">Quizzes</Link></li>
          {user && <li><Link to="/quizzes/create">Create Qwiz</Link></li> }
        </ul>
      </div>
      <div className="flex-1">
        <img src="https://i.imgur.com/NqXoaX6.png" className="max-h-12" alt="logo" />
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold tracking-wide">Qwizard</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/quizzes" className='font-bold text-white hover:text-gray-300'>Qwizzes</Link></li>
          {user && <li><Link to="/quizzes/create" className='font-bold text-white hover:text-gray-300'>Create Qwiz</Link></li> }
        </ul>
      </div>
      {user &&
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}&radius=50&scale=100`} alt="avatar" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link to="/quizzes/create" className="justify-between">
                  Create Quiz
                </Link>
              </li>
              <li><Link aria-disabled='true'>My Quizzes</Link></li>
              <li><span onClick={handleLogOut}>Logout</span></li>
            </ul>
          </div>
        </div>
      }
      {!user &&
        <div className="flex-none gap-2">
          <Link to="/login" className="btn btn-sm mr-5">Login</Link>
        </div>
      }
    </div>
  );
}