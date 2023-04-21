import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "http://192.168.200.105:3333",
  // TRABALHO -- baseURL: "http://192.168.25.31:3333",
});

export { api };
