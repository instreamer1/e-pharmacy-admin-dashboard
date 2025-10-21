import { createSlice } from '@reduxjs/toolkit'
import { fetchDashboardData } from './operations'

const initialState = {
  statistics: [],
  recentCustomers: [],
  incomeExpenses: [],
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDashboardData.fulfilled, (state, { payload }) => {
        state.loading = false
        state.statistics = payload.statistics
        state.recentCustomers = payload.recentCustomers
        state.incomeExpenses = payload.incomeExpenses
      })
      .addCase(fetchDashboardData.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const dashboardReducer = dashboardSlice.reducer
