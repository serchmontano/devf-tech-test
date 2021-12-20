import axios from "axios";

export default axios.create({
    baseURL: "https://covid-api.mmediagroup.fr/v1",
    responseType: "json"
});