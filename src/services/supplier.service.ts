import api from "./api";

export const supplierService = {
  getAll: () => api.get("/suppliers"),
  getById: (id: string) => api.get(`/suppliers/${id}`),
  create: (data: any) => api.post("/suppliers", data),
  update: (id: string, data: any) => api.put(`/suppliers/${id}`, data),
  remove: (id: string) => api.delete(`/suppliers/${id}`),
};
