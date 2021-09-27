const axios = require('axios');
const client = axios.create({
  baseURL: "https://api-dev.notegoatapp.com",
  timeout: 5000,
  withCredentials: true,
  adapter: require('axios/lib/adapters/http'),
});

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const randomName = () => uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

function createUser(username) {
  return client.post("https://api-dev.notegoatapp.com/user", {
      username: username ?? randomName(),
      password: "bar",
    });
}

async function loginUser(username) {
  const response = await client.post("/session", {
    username,
    password: "bar",
  });
  client.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
  return response;
}

module.exports = {
  createUser,
  loginUser,
  randomName,
  client,
};
