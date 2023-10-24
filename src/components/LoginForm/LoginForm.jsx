import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(null);
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (evt.target.attributes.name.value === 'login') {
        const user = await usersService.login({ email: credentials.email, password: credentials.password });
        setUser(user);
      } else if (evt.target.attributes.name.value === 'signup') {
        const { name, email, password } = credentials;
        const formData = { name, email, password };
        const user = await usersService.signUp(formData);
        setUser(user);
      }
      navigate('/');
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex max-h-[520px]">
        <img src="https://i.imgur.com/NqXoaX6.png" alt="mockup" />
      </div>
      <div className="lg:col-start-7 lg:col-span-6 z-10 flex flex-col items-center lg:place-self-center w-72 bg-violet-500 shadow-lg lg:h-full lg:w-3/5 lg:items-center lg:justify-center rounded-lg">
        <form autoComplete="off" onSubmit={handleSubmit} name={showSignUp ? 'signup' : 'login'} className='flex flex-col items-center p-10'>
          <div className='flex items-center justify-center w-full'>
            {showSignUp && <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${credentials.name}&radius=50&scale=25`} alt="avatar" />}
            <h2 className='font-bold text-white text-3xl m-3 text-center'>{showSignUp ? 'Sign Up' : 'Log In'}</h2>
            {showSignUp && <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${credentials.name}&radius=50&scale=25`} alt="avatar" />}
          </div>
          {showSignUp &&
            <>
              <label className='text-white'>Name</label>
              <input type="text" name="name" className='input input-bordered input-secondary w-full max-w-xs' value={credentials.name} onChange={handleChange} required />
            </>
          }
          <label className='text-white'>Email</label>
          <input type="text" name="email" className='input input-bordered input-secondary w-full max-w-xs' value={credentials.email} onChange={handleChange} required />
          <label className='text-white'>Password</label>
          <input type="password" name="password" className='input input-bordered input-secondary w-full max-w-xs focus:border-none' value={credentials.password} onChange={handleChange} required />
          {showSignUp &&
            <>
              <label className='text-white'>Confirm</label>
              <input type="password" name="confirm" className='input input-bordered input-secondary w-full max-w-xs focus:border-none' value={credentials.confirm} onChange={handleChange} required />
            </>
          }
          <button type="submit" className='btn btn-secondary m-4 w-full'>{showSignUp ? 'Sign Up' : 'Log In'}</button>
          <p className="error-message">&nbsp;{error}</p>
        </form>
        <hr className='w-1/2 -mt-8 mb-5 text-white' />
        <button className='btn btn-neutral mb-8' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      </div>
    </>
  );
}