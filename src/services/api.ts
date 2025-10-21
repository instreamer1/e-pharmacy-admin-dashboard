// services/api.ts

import axios from 'axios'
import { tokenStorage } from '../utils/TokenStorage'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // withCredentials: true, // важно для отправки cookies с refreshToken
})

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

// ✅ Интерцептор запросов - автоматически добавляет accessToken
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accessToken')
    const token = tokenStorage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ✅ Интерцептор ответов - обрабатывает 401 ошибки
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // ✅ Проверяем 401 ошибку и что запрос еще не повторялся
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/user/refresh')
    ) {
      if (isRefreshing) {
        // ✅ Если уже идет обновление - добавляем запрос в очередь
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

        // ✅ refreshToken автоматически отправляется в cookies
        const refreshAxios = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const response = await refreshAxios.post('/auth/refresh')

        const { accessToken } = response.data

        // ✅ Сохраняем новый accessToken
        tokenStorage.setToken(accessToken)
        // localStorage.setItem('accessToken', accessToken)

        console.log('✅ Token refreshed successfully')

        // ✅ Обрабатываем очередь запросов
        processQueue(null, accessToken)

        // ✅ Повторяем оригинальный запрос
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError)

        // ✅ Обрабатываем очередь с ошибкой
        processQueue(refreshError, null)

        // ✅ Очищаем токен и редиректим
        // localStorage.removeItem('accessToken')
        tokenStorage.clearToken()
        // window.location.href = '/login'

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api

// import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// })

// export default api
