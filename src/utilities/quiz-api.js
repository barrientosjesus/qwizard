import sendRequest from "./send-request";
const BASE_URL = "/api/quizzes";

export async function createQuiz(quizData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', quizData);
}

export async function getAll() {
    return sendRequest(BASE_URL);
}