import CreateQuestionListQuestion from "../CreateQuestionListQuestion/CreateQuestionListQuestion";

export default function QuestionFormList({ questions }) {
    return (
        <section className="col-start-5 max-h-max w-full col-end-13 rounded-md flex flex-col items-center m-2">
            <ul className="w-full">
                {questions.map(question => (
                    <CreateQuestionListQuestion question={question} />
                ))}
            </ul>
        </section>
    );
}