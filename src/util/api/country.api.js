// 여기 나라 api 갖고온거 쓰는 곳
class CountryAPI {
  #client;
  constructor(client) {
    this.#client = client;
  }
  async getAllCountries() {
    const response = await this.#client.get("/all");
    console.log(response);
    const data = response.data;
    const result = data.result;
    return result;
  }
}

export default CountryAPI;
