//authSlice/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { normalizeError, type NormalizedError } from '../../utils/normalizeError'
import { authService } from '../../services/auth.service'
import { clearAllCookies } from '../../utils/cookies'
import { purgePersistedState } from '../persist'
import type { LoginCredentials, User, UserResponse } from './types'
import type { RootState } from '../store'

// import type { Role } from '../../constants/roles'
// import axios from 'axios'
// import { tokenStorage } from '../../utils/TokenStorage'
import { logOut } from './slice'

export const logInUser = createAsyncThunk<
  UserResponse,
  LoginCredentials,
  { rejectValue: NormalizedError }
>('auth/logInUser', async (credentials, thunkAPI) => {
  try {
    const response = await authService.login(credentials)
    // localStorage.setItem('accessToken', response.data.accessToken)
    // const { accessToken, expiresIn } = response.data.tokens

    // ✅ Сохраняем токен в памяти
    // tokenStorage.setToken(accessToken)
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
  } catch (error) {
    console.warn('Logout request failed:', error)
    return thunkAPI.rejectWithValue(error as NormalizedError)
  } finally {
    try {
      clearAllCookies()
      await purgePersistedState(persistor)
      // localStorage.removeItem('accessToken')
      // tokenStorage.clearToken()
      sessionStorage.clear()
      thunkAPI.dispatch(logOut())
    } catch (cleanupError) {
      console.error('Cleanup after logout failed:', cleanupError)
    }
  }
})

// export const logOutUser = createAsyncThunk<
//   void,
//   void,
//   { rejectValue: NormalizedError; extra: { persistor: any } }
// >('auth/logOutUser', async (_, thunkAPI) => {
//   const { persistor } = thunkAPI.extra

//   try {
//     await authService.logout()
//     clearAllCookies()
//     await purgePersistedState(persistor)

//     // localStorage.clear()
//     sessionStorage.clear()
//   } catch (error) {
//     clearAllCookies()
//     await purgePersistedState(persistor)
//     localStorage.clear()
//     sessionStorage.clear()

//     return thunkAPI.rejectWithValue(error as NormalizedError)
//   }
// })

export const getProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: NormalizedError; state: RootState }
>('auth/getProfile', async (_, thunkAPI) => {
  try {
    // const token = localStorage.getItem('accessToken')
    // const token = tokenStorage.getToken()
    const token = thunkAPI.getState().auth.tokens.accessToken
    if (!token) {
      return thunkAPI.rejectWithValue({
        message: 'No access token',
        code: 'NO_TOKEN',
      })
    }
    const response = await authService.getCurrentUser(token)
    return response.data
  } catch (error: unknown) {
    localStorage.removeItem('accessToken')
    return thunkAPI.rejectWithValue(normalizeError(error))
  }
})

let isRefreshing = false
let refreshPromise: Promise<any> | null = null

export const refresh = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: NormalizedError }
>('auth/refresh', async (_, thunkApi) => {
  try {
    if (isRefreshing && refreshPromise) {
      const data = await refreshPromise
      console.log(data.tokens.accessToken);
      if (!data?.tokens?.accessToken) {
        throw new Error('No access token in refresh response')
      }
      // const { accessToken, expiresIn } = response.tokens
      // localStorage.setItem('accessToken', data.accessToken)
      // console.log(response);
      // tokenStorage.setToken(accessToken)
      return data
    }

    isRefreshing = true

    refreshPromise = authService.refreshToken()
      //axios .post(`${import.meta.env.VITE_API_BASE_URL}/user/refresh`, { withCredentials: true })
      .then((response) => response.data)
    // refreshPromise = authService.refreshToken().then((response) => response.data)

    const data = await refreshPromise
    console.log(data.tokens.accessToken);
    if (!data?.tokens?.accessToken) {
      throw new Error('No access token in refresh response')
    }
    // tokenStorage.setToken(data.tokens.accessToken)
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(normalizeError(error))
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
})
