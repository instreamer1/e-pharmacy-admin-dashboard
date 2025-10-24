import { createAsyncThunk } from '@reduxjs/toolkit'
import { dashboardService } from '../../services/dashboard.service'
import { normalizeError, type NormalizedError } from '../../utils/normalizeError'
import type { RootState } from '../store'
import { tokenStorage } from '../../utils/TokenStorage'

export const fetchDashboardData = createAsyncThunk<
  void,
  void,
  { rejectValue: NormalizedError; state: RootState }
>('dashboard/fetchData', async (_, thunkAPI) => {
  try {
    // const token = localStorage.getItem('accessToken')
    const token = thunkAPI.getState().auth.tokens.accessToken
    // const token = tokenStorage.getToken()
    if (!token) {
      return thunkAPI.rejectWithValue({
        message: 'No access token',
        code: 'NO_TOKEN',
      })
    }
    const { data } = await dashboardService.fetchData(token)
    return data
  } catch (error: unknown) {
    console.log(error.response.data)
    const normalizedError = normalizeError(error.response.data)
    console.log(normalizeError)
    return thunkAPI.rejectWithValue(normalizedError)
  }
})
