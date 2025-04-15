import axios from "axios";

const URL =
    "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

    export async function getData() {
        const response = await axios.get(URL);
        return response.data;
    }