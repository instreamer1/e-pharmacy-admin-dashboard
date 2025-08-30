// services/auth.service.ts
import  api  from "./api";

export const authService = {
//   register: (data: { name: string; email: string; password: string }) =>
//     api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),

  refreshToken: () => api.post("/auth/refresh"),

  getUserInfo: () => api.get("/auth/me"),
};
