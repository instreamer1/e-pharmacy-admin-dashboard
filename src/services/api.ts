// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // если используешь куки
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});



// Интерсепторы для токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);

export default api;

// const authInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true ,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   }
// });

// export default authInstance;