import api from './api'

export const dashboardService = {
  fetchData: (token?: string) => {
    return api.get('/dashboard')
  },
}
