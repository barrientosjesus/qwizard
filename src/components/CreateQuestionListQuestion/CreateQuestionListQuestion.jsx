export default function CreateQuestionListQuestion({ question }) {
    return (
        <div className="my-3 py-3 bg-violet-500 w-full rounded-md flex justify-start pl-5">
            <p className="text-white text-2xl">{question.question}</p>
        </div>
    );
}