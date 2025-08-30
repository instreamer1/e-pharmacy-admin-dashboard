//authSlice/slice.js

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logInUser, logOutUser, refresh, getUser } from './operations'
import type { NormalizedError } from '../../utils/errorHandler'

interface User {
  name: string
  email: string
}

interface UserState {
  user: User | null
  accessToken: string | null
  isLoggedIn: boolean
  isRefreshing: boolean
  isLoading: boolean
  error: NormalizedError | null
}

const initialState: UserState = {
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
    logOut(state) {
      state.user = null
      state.accessToken = null
      state.isLoggedIn = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // ================= LOG IN =================
    builder
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
          state.user = action.payload.user
          state.accessToken = action.payload.accessToken
          state.isLoggedIn = true
          state.isLoading = false
        },
      )
      .addCase(logInUser.rejected, (state, action: PayloadAction<NormalizedError | undefined>) => {
        state.error = action.payload || { message: 'Unknown error', code: 'UNEXPECTED' }
        state.isLoading = false
      })

      // ================= LOG OUT =================

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
        state.error = action.payload || { message: 'Unknown error', code: 'UNEXPECTED' }
        state.isLoading = false
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
      })

      // ================= REFRESH TOKEN =================

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true
        state.error = null
      })
      .addCase(
        refresh.fulfilled,
        (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
          state.isRefreshing = false
          state.user = action.payload.user
          state.accessToken = action.payload.accessToken
          state.isLoggedIn = true
        },
      )
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
      })

      // ================= GET USER =================

      .addCase(getUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<NormalizedError | undefined>) => {
        state.error = action.payload || { message: 'Unknown error', code: 'UNEXPECTED' }
        state.isLoading = false
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
      })
  },
})

export const { logOut } = authSlice.actions
export const authReducer = authSlice.reducer
