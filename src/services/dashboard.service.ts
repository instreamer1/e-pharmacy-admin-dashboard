import api from './api'

export const dashboardService = {
  fetchData: () => 
    api.get('/dashboard'),
  
}
