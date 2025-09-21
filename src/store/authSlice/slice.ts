//authSlice/slice.js
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { logInUser, logOutUser, refresh, fetchCurrentUser } from './operations'
import type { NormalizedError } from '../../utils/normalizeError'
import type { AuthState } from './types'



const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    //  LOG IN
    builder
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isLoggedIn = true
        state.isLoading = false
        state.error = null
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || { message: 'Unknown error', code: 'UNKNOWN' }
      })
      // LOG OUT

      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
        state.isLoading = false
        state.error = null
      })
      .addCase(logOutUser.rejected, (state, action: PayloadAction<NormalizedError | undefined>) => {
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
        state.isLoading = false
        state.error = action.payload || { message: 'Logout failed', code: 'LOGOUT_FAILED' }
      })

      // REFRESH TOKEN

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true
        state.error = null
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.accessToken = action.payload.accessToken
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
        state.error = action.payload || { message: 'Refresh failed', code: 'REFRESH_FAILED' }
      })

      // GET USER

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
        state.error = action.payload || { message: 'Fetch user failed', code: 'FETCH_USER_FAILED' }
      })
  },
})

export const { clearError } = authSlice.actions
export const authReducer = authSlice.reducer
