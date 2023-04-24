const axios = require("axios");
const API_ROOT = "https://api.swoogo.com/api/v1";

class Swoogo {
  apiKey = "";
  apiSecret = "";

  access_token = "";

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async generateToken() {
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

  async getToken() {
    // TODO: Implement Redis caching to cache the token
    return this.generateToken();
  }

  async request({ method = "GET", path, data, params }) {
    const token = await this.getToken();

   
    const response = await axios({
      url: `${API_ROOT}${path}`,
      method,
      data,
      params,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    
    return response.data;
  }

  async getEventById(id) {
    return this.request({
      path: `/events/${id}.json`,
    });
  }

  async getEventSessions(id, page = 1, perPage = 20) {
    const sessions = await this.request({
      path: `/sessions.json?event_id=${id}&fields=id,name,description,start_time,end_time,capacity&expand=speakers&page=${page}&per-page=${perPage}`,
    });

    return {
      items: sessions.items,
      _meta: sessions._meta,
    }
  }

  async getEventSessionById(id) {
    return this.request({
      path: `/sessions/${id}.json?expand=speakers`,
    });
  }

  // async getEventSessions
}

const client = new Swoogo(
  process.env.SWOOGO_API_KEY,
  process.env.SWOOGO_API_SECRET
);

// client.getEventSessions(102171).then(res => console.log({res}, {depth: null})).catch(console.log)
// client.getEventSessionById(1321121).then(console.log).catch(console.log)

module.exports = client;
