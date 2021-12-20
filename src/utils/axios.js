import axios from "axios";

export const covidAPI = axios.create({
    baseURL: "https://covid-api.mmediagroup.fr/v1",
    responseType: "json"
});

export const countryAPI = axios.create({
    baseURL: "https://restcountries.com/v3.1",
    responseType: "json"
})
