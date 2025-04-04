import axios from "axios";

const api = axios.create({
  baseURL: "http://auth-boilerplate.luizmauro.com",
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 401 || response.status === 403) {
      localStorage.clear();
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
      }
      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  }
);

export default api;
