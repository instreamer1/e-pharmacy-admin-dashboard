// services/auth.service.ts
import api from './api'

export const authService = {
  login: (data: { email: string; password: string }) => api.post('/user/signin', data, {withCredentials: true}),

  logout: () => api.post('/user/logout', {}, {withCredentials: true}),
  refreshToken: () => api.post('/user/refresh', {}, {withCredentials: true}),

  // getCurrentUser: () => api.get("/user/user-info"),
  getCurrentUser: (token?: string) => {
    return api.get('/user/user-info', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  },
}
