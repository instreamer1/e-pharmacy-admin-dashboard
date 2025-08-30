//authSlice/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { normalizeError, type NormalizedError } from '../../utils/errorHandler'
// import { clearAllCookies } from '../../utils/cookieUtils'
// import { purgePersistedState } from '../../utils/persistUtils'
import { authService } from '../../services/auth.service'

// export const registerUser = createAsyncThunk(
//   'users/signup',
//   async (newUser, thunkAPI) => {
//     try {
//       const response = await register(newUser);
//       return response.data;
//     } catch (error) {
//       const errorMessage = normalizeError(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

export interface User {
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}


export const logInUser = createAsyncThunk<
  UserResponse,                   
  LoginCredentials,                  
  { rejectValue: NormalizedError }   
>(
  'auth/logInUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      return response.data; 
    } catch (error: unknown) {
    
      const normalizedError = normalizeError(error);
     
      return thunkAPI.rejectWithValue(normalizedError);
    }
  }
);

export const logOutUser = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    await authService.logout()

    clearAllCookies()

    await purgePersistedState()

    // thunkAPI.dispatch({ type: 'RESET_STATE' });

    localStorage.clear()
    sessionStorage.clear()

    return null
  } catch (error) {
    clearAllCookies()
    await purgePersistedState()
    thunkAPI.dispatch({ type: 'RESET_STATE' })

    const errorMessage = normalizeError(error)
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const getUser = createAsyncThunk<
  User,                             // fulfilled
  void,                             // argument
  { rejectValue: NormalizedError }  // rejected
>('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await authService.getUserInfo();
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(normalizeError(error));
  }
});



let isRefreshing = false
let refreshPromise = null

export const refresh = createAsyncThunk('user/refresh', async (_, thunkApi) => {
  try {
    if (isRefreshing && refreshPromise) {
      const { data } = await refreshPromise
      if (!data?.accessToken) {
        throw new Error('No access token in refresh response')
      }

      return data
    }

    isRefreshing = true
    refreshPromise = refreshToken()

    const { data } = await refreshPromise

    return data
  } catch (error) {
    return thunkApi.rejectWithValue(normalizeError(error))
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
})
