import axios from "axios";

export const postRequest = (apiUrl, body, headers) => {
    return axios.post(apiUrl, body, headers);
} 