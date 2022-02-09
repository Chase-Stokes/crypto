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
  static async getExchange() {
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
}