import CreateQuestionListQuestion from "../CreateQuestionListQuestion/CreateQuestionListQuestion";

export default function QuestionFormList({ questions, handleDeleteQuestion }) {
    return (
        <section className="col-span-12 grow overflow-auto mx-2 my-3 max-h-max">
            {questions.map((question, index) => (
                <CreateQuestionListQuestion question={question} key={index} index={index} handleDeleteQuestion={handleDeleteQuestion} />
            ))}
        </section>
    );
}