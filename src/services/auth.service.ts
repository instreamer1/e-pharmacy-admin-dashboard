// services/auth.service.ts
import api from './api'

export const authService = {
  login: (data: { email: string; password: string }) => api.post('/user/signin', data, { withCredentials: true }),

  logout: () => api.post('/user/logout'),

  refreshToken: () => api.post('/user/refresh'),

  // getCurrentUser: () => api.get("/user/user-info"),
  getCurrentUser: (token?: string) => {
    return api.get('/user/user-info', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  },
}
