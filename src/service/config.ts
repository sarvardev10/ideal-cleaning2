import axios from "axios";

const http = axios.create({
  baseURL: "https://service.olimjanov.uz/v1",
});

http.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = access_token
  }
  return config;
});
export default http;
