export default class CryptoAPI {
  static async getCurrencyAndPrice() {
    try {
      const response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&interval=1d,30d&per-page=10&page=1`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async valueOverTime() {
    try {
      const response = await fetch(`https://api.nomics.com/v1/exchange-rates/history?key=${process.env.API_KEY}&currency=BTC&start=2018-01-01T00%3A00%3A00Z&end=2022-02-10T00%3A00%3A00Z`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
