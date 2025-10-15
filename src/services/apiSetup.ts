// services/apiSetup.ts

import api from './api'
import type { Store } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { logOutUser } from '../store/authSlice/operations'
import { setAccessToken } from '../store/authSlice/slice'
import { authService } from './auth.service'

export const setupApiInterceptors = (store: Store<RootState>) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
        
            const { data } = await authService.refreshToken();
            console.log('REFRESH OK:', data);
            store.dispatch(setAccessToken(data.accessToken));
        
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          return api(originalRequest)
        } catch (refreshError) {
            store.dispatch(logOutUser());
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    },
  )
}

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
