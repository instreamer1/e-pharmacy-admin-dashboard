// services/auth.service.ts
import  api  from "./api";

export const authService = {
//   register: (data: { name: string; email: string; password: string }) =>
//     api.post("/user/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/user/signin", data),

  logout: () => api.post("/user/logout"),

  refreshToken: () => api.post("/user/refresh"),

  // getCurrentUser: () => api.get("/user/user-info"),
   getCurrentUser: (token?: string) => {
  return api.get('/user/user-info', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })},
};
