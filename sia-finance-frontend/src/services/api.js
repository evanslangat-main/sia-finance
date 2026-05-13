import axios from "axios";

/*
  Axios Instance

  Automatically attaches JWT token
  to every request.
*/

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

/*
  Attach token automatically
*/
api.interceptors.request.use((config) => {

  const token = localStorage.getItem(
    "accessToken"
  );

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;