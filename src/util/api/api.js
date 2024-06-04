import axios from "axios";
import CountryAPI from "./country.api";

const BASE_URL = "https://restcountries.com/v3.1/";

class API {
  #baseURL = BASE_URL;
  #client;
  countries;

  constructor() {
    this.#client = axios.create({ baseURL: this.#baseURL });
    this.countries = new CountryAPI(this.#client);
  }
}
const api = new API();
export default api;
