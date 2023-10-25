import CreateQuestionListQuestion from "../CreateQuestionListQuestion/CreateQuestionListQuestion";

export default function QuestionFormList({ questions }) {
    return (
        <section className="col-start-5 col-end-13 grid grid-cols-12 mx-2 my-3 max-h-max">
            <div id="accordion-flush" className="col-span-12" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                {questions.map((question, index) => (
                    <CreateQuestionListQuestion question={question} key={index} index={index} />
                ))}
            </div>
        </section>
    );
}