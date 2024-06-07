import axios from 'axios';

const BASE_URL = `https://apis.data.go.kr/1262000/CountryCodeService2/getCountryCodeList2?serviceKey=${
  import.meta.env.VITE_COUNTRY_KEY
}`;
const PAGE_NO = 24;
class API {
  #baseURL = BASE_URL;
  #client;
  countries;
  constructor() {
    this.#client = axios.create({ baseURL: this.#baseURL });
    this.countries = new CountryAPI(this.#client);
  }
}

class CountryAPI {
  #client;
  #array = [];
  constructor(client) {
    this.#client = client;
  }
  async getAllCountries() {
    for (let i = 1; i <= PAGE_NO; i++) {
      const response = await this.#client.get(`${BASE_URL}&pageNo=${i}`);
      const newArr = response.data.data.map((data) => data.country_nm, []);
      this.#array = this.#array.concat(newArr);
    }

    return this.#array;
  }
}
const api = new API();
export default api;
