// services/apiSetup.ts

import api from './api'
import { store } from '../store/store' // Импортируем store
import axios from 'axios'
import { logOut, setAccessToken } from '../store/authSlice/slice'

export const setupApiInterceptors = () => {
  let isRefreshing = false
  let failedQueue: Array<{ resolve: (value?: any) => void; reject: (error?: any) => void }> = []

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })
    failedQueue = []
  }

  // ✅ Интерцептор запросов
  api.interceptors.request.use(
    (config) => {
      const state = store.getState()
      const accessToken = state.auth.tokens.accessToken
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // ✅ Интерцептор ответов
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/user/refresh')
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return api(originalRequest)
            })
            .catch((err) => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          console.log('🔄 Attempting to refresh token...')
          const refreshAxios = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })

          const response = await refreshAxios.post('/user/refresh')
          console.log(response.data)
          const { accessToken } = response.data.tokens
          store.dispatch(setAccessToken(response.data))
          // ✅ Используем существующий action из authSlice
          // store.dispatch({
          //   type: 'auth/setTokens',
          //   payload: response.data
          // })

          console.log('✅ Token refreshed successfully')
          processQueue(null, accessToken)

          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError)
          processQueue(refreshError, null)
          store.dispatch(logOut())
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    },
  )
}

// let refreshPromise: Promise<any> | null = null;
// let isRefreshing = false;

// // ✅ 1. Интерцептор запросов - автоматически добавляет accessToken
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ 2. Интерцептор ответов - обрабатывает 401 ошибки
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
// console.log("interceptors", error);
//     // ✅ Проверяем 401 ошибку и что запрос еще не повторялся
//     if (error.response?.status === 401 && !originalRequest._retry) {

//       // ✅ Если уже идет обновление токена - ждем его
//       if (isRefreshing) {
//         try {
//           await refreshPromise;
//           return api(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }

//       // ✅ Помечаем запрос как повторяемый
//       originalRequest._retry = true;
//       isRefreshing = true;

//       // ✅ Создаем promise для обновления токена
//       refreshPromise = new Promise(async (resolve, reject) => {
//         try {
//           console.log('🔄 Attempting to refresh token...');

//           // ✅ refreshToken автоматически отправляется в cookies
//           const response = await api.post('/auth/refresh');

//           const { accessToken } = response.data;

//           // ✅ Сохраняем новый accessToken
//           localStorage.setItem('accessToken', accessToken);

//           console.log('✅ Token refreshed successfully');
//           resolve(response.data);
//         } catch (refreshError) {
//           console.error('❌ Token refresh failed:', refreshError);

//           // ✅ При неудаче очищаем токен и редиректим на логин
//           localStorage.removeItem('accessToken');
//           // window.location.href = '/login';
//           reject(refreshError);
//         } finally {
//           isRefreshing = false;
//           refreshPromise = null;
//         }
//       });

//       try {
//         // ✅ Ждем обновления токена и повторяем оригинальный запрос
//         await refreshPromise;
//         return api(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     // ✅ Для других ошибок просто реджектим
//     return Promise.reject(error);
//   }
// );

// export default api;

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
