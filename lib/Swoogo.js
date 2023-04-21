const axios = require("axios");
const API_ROOT = "https://api.swoogo.com/api/v1";

class Swoogo {
  apiKey = "";
  apiSecret = "";
  
  access_token = '';

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async getToken() {
    const response = await axios.post(
      `${API_ROOT}/oauth2/token.json`,
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        auth: {
          username: this.apiKey,
          password: this.apiSecret,
        },
      }
    );

    return {
      type: response.data.type,
      access_token: response.data.access_token,
      expires_at: response.data.expires_at,
    };
  }
}

const client = new Swoogo(
  process.env.SWOOGO_API_KEY,
  process.env.SWOOGO_API_SECRET
);

module.exports = client;
