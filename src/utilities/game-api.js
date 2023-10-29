import sendRequest from "./send-request";
const BASE_URL = "/api/games";

export async function getAllGames() {
    return sendRequest(BASE_URL);
}