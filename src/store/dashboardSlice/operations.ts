import { createAsyncThunk } from '@reduxjs/toolkit'
import { dashboardService } from '../../services/dashboard.service'
import { normalizeError, type NormalizedError } from '../../utils/normalizeError'
import type { RootState } from '../store'

export const fetchDashboardData = createAsyncThunk<
  void,
  void,
  { rejectValue: NormalizedError; state: RootState }
>('dashboard/fetchData', async (_, thunkAPI) => {
  try {
    const { data } = await dashboardService.fetchData()
    return data
  } catch (error: unknown) {
    const normalizedError = normalizeError(error)
    return thunkAPI.rejectWithValue(normalizedError)
  }
})
