import api from './api'

export const dashboardService = {
  fetchData: (token?: string) => 
    api.get('/dashboard', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
  
}
