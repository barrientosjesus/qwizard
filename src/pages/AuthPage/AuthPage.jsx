import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {

  return (
    <main className='items-center grid grid-cols-12 justify-items-center w-full'>
      <div className="grid grid-cols-12 max-w-screen-xl py-8 items-center lg:gap-8 xl:gap-0 lg:py-16 col-span-12 lg:z-10 w-full">
        <LoginForm setUser={setUser} />
      </div>
    </main>
  );
}