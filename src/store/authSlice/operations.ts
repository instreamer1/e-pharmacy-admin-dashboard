//authSlice/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { normalizeError, type NormalizedError } from '../../utils/normalizeError'
import { authService } from '../../services/auth.service'
import { clearAllCookies } from '../../utils/cookies'
import { purgePersistedState } from '../persist'
import type { LoginCredentials, User, UserResponse } from './types'
import type { RootState } from '../store'


export const logInUser = createAsyncThunk<
  UserResponse,
  LoginCredentials,
  { rejectValue: NormalizedError }
>('auth/logInUser', async (credentials, thunkAPI) => {
  try {
    const response = await authService.login(credentials)
    return response.data
  } catch (error: unknown) {
    const normalizedError = normalizeError(error)
    return thunkAPI.rejectWithValue(normalizedError)
  }
})

export const logOutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: NormalizedError; extra: { persistor: any } }
>('auth/logOutUser', async (_, thunkAPI) => {
  const { persistor } = thunkAPI.extra

  try {
    await authService.logout()
    clearAllCookies()
    await purgePersistedState(persistor)

    localStorage.clear()
    sessionStorage.clear()
  } catch (error) {
    clearAllCookies()
    await purgePersistedState(persistor)
    localStorage.clear()
    sessionStorage.clear()

    return thunkAPI.rejectWithValue(error as NormalizedError)
  }
})

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: NormalizedError; state: RootState }
>('auth/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.accessToken
    if (!token) {
      return thunkAPI.rejectWithValue({
        message: 'No access token',
        code: 'NO_TOKEN',
      })
    }
    const response = await authService.getCurrentUser(token)
    return response.data
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(normalizeError(error))
  }
})

let isRefreshing = false
let refreshPromise: Promise<any> | null = null

export const refresh = createAsyncThunk<
  { accessToken: string },
  void,
  { rejectValue: NormalizedError }
>('auth/refresh', async (_, thunkApi) => {
  try {
    if (isRefreshing && refreshPromise) {
      const data = await refreshPromise
      if (!data?.accessToken) {
        throw new Error('No access token in refresh response')
      }

      return data
    }

    isRefreshing = true
    refreshPromise = authService.refreshToken().then((response) => response.data)

    const data = await refreshPromise
    if (!data?.accessToken) {
      throw new Error('No access token in refresh response')
    }
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(normalizeError(error))
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
})
