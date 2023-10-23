import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {

  return (
    <main className='flex items-center'>
      <div className="grid mr-auto max-w-screen-xl px-4 py-8 mx-auto items-center lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:z-10">
        <LoginForm setUser={setUser} />
      </div>
    </main>
  );
}