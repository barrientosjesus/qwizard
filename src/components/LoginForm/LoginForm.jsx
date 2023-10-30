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
      <div className="hidden lg:mt-0 md:col-span-5 md:flex max-h-[520px] justify-center items-center">
        {showSignUp ?
          <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${credentials.name}&radius=50&scale=64`} className='bg-violet-500/80 rounded-full' alt="avatar" />
          :
          <img src="https://i.imgur.com/NqXoaX6.png" alt="mockup" />
        }
      </div>
      <div className="col-span-12 md:col-start-7 md:col-span-5 z-10 flex flex-col lg:place-self-center bg-violet-500/90 shadow-lg lg:h-full w-full lg:items-center lg:justify-center rounded-lg">
        <form autoComplete="off" onSubmit={handleSubmit} name={showSignUp ? 'signup' : 'login'} className='flex flex-col items-center p-2'>
          <div className='flex items-center justify-center'>
            <p className='font-bold text-white text-3xl text-center'>{showSignUp ? 'Sign Up' : 'Log In'}</p>
          </div>
          <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${credentials.name}&radius=50`} className='flex h-[72px] md:hidden' alt="avatar" />
          {showSignUp &&
            <>
              <label className='text-white flex justify-center items-center mt-4'>Name</label>
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
          <button type="submit" className='btn btn-secondary m-4 w-1/2 md:w-2/6 lg:w-full'>{showSignUp ? 'Sign Up' : 'Log In'}</button>
          <p className="error-message">&nbsp;{error}</p>
          <hr className='w-1/2 md:w-2/6 lg:w-full -mt-8 mb-5 text-white' />
          <button className='btn btn-neutral mb-8 w-1/2 md:w-2/6 lg:w-full' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
        </form>
      </div>
    </>
  );
}