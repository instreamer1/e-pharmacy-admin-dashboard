// services/apiSetup.ts

import api from './api'

let refreshPromise: Promise<any> | null = null;
let isRefreshing = false;

// ✅ 1. Интерцептор запросов - автоматически добавляет accessToken
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 2. Интерцептор ответов - обрабатывает 401 ошибки
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
console.log("interceptors", error);
    // ✅ Проверяем 401 ошибку и что запрос еще не повторялся
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // ✅ Если уже идет обновление токена - ждем его
      if (isRefreshing) {
        try {
          await refreshPromise;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      // ✅ Помечаем запрос как повторяемый
      originalRequest._retry = true;
      isRefreshing = true;

      // ✅ Создаем promise для обновления токена
      refreshPromise = new Promise(async (resolve, reject) => {
        try {
          console.log('🔄 Attempting to refresh token...');
          
          // ✅ refreshToken автоматически отправляется в cookies
          const response = await api.post('/auth/refresh');
          
          const { accessToken } = response.data;
          
          // ✅ Сохраняем новый accessToken
          localStorage.setItem('accessToken', accessToken);
          
          console.log('✅ Token refreshed successfully');
          resolve(response.data);
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          
          // ✅ При неудаче очищаем токен и редиректим на логин
          localStorage.removeItem('accessToken');
          // window.location.href = '/login';
          reject(refreshError);
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      });

      try {
        // ✅ Ждем обновления токена и повторяем оригинальный запрос
        await refreshPromise;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // ✅ Для других ошибок просто реджектим
    return Promise.reject(error);
  }
);

export default api;

// import type { Store } from '@reduxjs/toolkit'
// import type { RootState } from '../store/store'
// import { logOut, setAccessToken } from '../store/authSlice/slice'
// import { authService } from './auth.service'





// export const setupApiInterceptors = (store: Store<RootState>) => {
//   api.interceptors.request.use((config) => {
//     const token = store.getState().auth.accessToken
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   })

//   api.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//       const originalRequest = error.config

//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true

//         try {
        
//             const { data } = await authService.refreshToken();
//             console.log('REFRESH OK:', data);
//             store.dispatch(setAccessToken(data.accessToken));
        
//           originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
//           return api(originalRequest)
//         } catch (refreshError) {
//             store.dispatch(logOut());
//           return Promise.reject(refreshError)
//         }
//       }

//       return Promise.reject(error)
//     },
//   )
// }

// import type { Store } from "@reduxjs/toolkit";
// import type { RootState } from "../store/store";

// export const setupApiInterceptors = (store: Store<RootState>) => {
//   api.interceptors.request.use((config) => {
//     const token = store.getState().auth.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });
// };
