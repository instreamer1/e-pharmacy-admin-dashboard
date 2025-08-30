import api from "./api";

export const orderService = {
  getAll: () => api.get("/orders"),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post("/orders", data),
  update: (id: string, data: any) => api.put(`/orders/${id}`, data),
  remove: (id: string) => api.delete(`/orders/${id}`),
};

