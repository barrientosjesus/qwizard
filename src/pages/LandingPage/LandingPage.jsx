import { Link } from "react-router-dom";

export default function LandingPage({ user }) {
    return (

        <div className="grid mr-auto max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:z-10">
            <div className="hidden lg:mt-0 lg:col-span-5 lg:grid lg:items-center">
                <img src="https://i.imgur.com/NqXoaX6.png" alt="mockup" />
            </div>
            <div className="lg:col-span-7 z-10 flex flex-col items-center lg:block lg:place-self-center">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl flex lg:block">You're a&nbsp;<br /><span className="text-violet-500">Qwizard</span>&nbsp;Harry</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">A versatile quiz and trivia application to see which
                    of your friends is the best of the best. Do you have
                    what it takes to be a <span className="text-violet-500 font-bold">Qwizard?</span></p>
                <Link to={user ? '/quizzes/create' : '/login'} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-violet-500 hover:bg-violet-400 focus:ring-4 focus:ring-primary-300 ">
                    Create Qwiz
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>
        </div>

    );
}