//authSlice/slice.js
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { logInUser, logOutUser, refresh, getProfile } from './operations'
import type { NormalizedError } from '../../utils/normalizeError'
import type { AuthState } from './types'

const initialState: AuthState = {
  user: null,
  tokens: {
    accessToken: '',
    expiresIn: '',
  },
  isAuthenticated: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      console.log(action.payload)
      state.tokens = {
        accessToken: action.payload.tokens.accessToken,
        expiresIn: action.payload.tokens.expiresIn,
      }
      state.isAuthenticated = true
    },
    clearTokens: (state) => {
      state.tokens = {
        accessToken: '',
        expiresIn: '',
      }
      state.isAuthenticated = false
      state.user = null
    },
    clearError: (state) => {
      state.error = null
    },
    logOut: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.tokens = {
        accessToken: '',
        expiresIn: '',
      }
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
        
        // state.user = {
        // name: action.payload.name,
        // email: action.payload.email,
        // roles:action.payload.roles,
        // }
        state.tokens = {
          accessToken: action.payload.tokens.accessToken,
          expiresIn: action.payload.tokens.expiresIn,
        }
        state.isAuthenticated = true
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
        state.tokens = {
          accessToken: '',
          expiresIn: '',
        }
        state.isAuthenticated = false
        state.isLoading = false

        state.error = null
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.user = null
        state.tokens = {
          accessToken: '',
          expiresIn: '',
        }
        state.isAuthenticated = false
        state.isLoading = false
        state.error = action.payload || { message: 'Logout failed', code: 'LOGOUT_FAILED' }
      })

      // REFRESH TOKEN

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true
        state.error = null
      })
      .addCase(refresh.fulfilled, (state, action) => {
        console.log('refresh.fulfilled', action)
        // state.user = {
        // name: action.payload.name,
        // email: action.payload.email,

        //   roles: action.payload,
        // }
        state.tokens = {
          accessToken: action.payload.tokens.accessToken,
          expiresIn: action.payload.tokens.expiresIn,
        }
        state.isRefreshing = false
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(refresh.rejected, (state, action) => {
        console.log('refresh.rejected', action)
        state.isRefreshing = false
        state.user = null
        state.tokens = {
          accessToken: '',
          expiresIn: '',
        }
        state.isAuthenticated = false
        state.error = action.payload || { message: 'Refresh failed', code: 'REFRESH_FAILED' }
      })

      // GET USER

      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log('fetchCurrentUser', action.payload)
        // state.user = action.payload
        state.user = {
          // id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          roles: action.payload.roles,
        }
        state.isLoading = false
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload || { message: 'Fetch user failed', code: 'FETCH_USER_FAILED' }
      })
  },
})

export const {setAccessToken, clearTokens, clearError,  logOut } = authSlice.actions
export const authReducer = authSlice.reducer

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null
//     },
//     setAccessToken: (state, action: PayloadAction<string>) => {
//       state.accessToken = action.payload
//     },
//     logOut: (state) => {
//       state.accessToken = null
//       state.user = null
//       state.isAuthenticated = false
//     },
//   },
//   extraReducers: (builder) => {
//     //  LOG IN
//     builder
//       .addCase(logInUser.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(logInUser.fulfilled, (state, action) => {
//         console.log(action.payload)
//         state.user = { role: action.payload.role }
//         state.accessToken = action.payload.accessToken
//         state.isAuthenticated = true
//         state.isLoading = false
//         state.error = null
//       })
//       .addCase(logInUser.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload || { message: 'Unknown error', code: 'UNKNOWN' }
//       })
//       // LOG OUT

//       .addCase(logOutUser.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(logOutUser.fulfilled, (state) => {
//         state.user = null
//         state.accessToken = null
//         state.isAuthenticated = false
//         state.isLoading = false
//         state.error = null
//       })
//       .addCase(logOutUser.rejected, (state, action) => {
//         state.user = null
//         state.accessToken = null
//         state.isAuthenticated = false
//         state.isLoading = false
//         state.error = action.payload || { message: 'Logout failed', code: 'LOGOUT_FAILED' }
//       })

//       // REFRESH TOKEN

//       .addCase(refresh.pending, (state) => {
//         state.isRefreshing = true
//         state.error = null
//       })
//       .addCase(refresh.fulfilled, (state, action) => {
//         state.isRefreshing = false
//         state.accessToken = action.payload.accessToken
//         state.isAuthenticated = true
//         state.error = null
//       })
//       .addCase(refresh.rejected, (state, action) => {
//         state.isRefreshing = false
//         state.user = null
//         state.accessToken = null
//         state.isAuthenticated = false
//         state.error = action.payload || { message: 'Refresh failed', code: 'REFRESH_FAILED' }
//       })

//       // GET USER

//       .addCase(getProfile.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(getProfile.fulfilled, (state, action) => {
//         console.log('fetchCurrentUser', action.payload)
//         state.user = action.payload
//         state.isLoading = false
//         state.isAuthenticated = true
//         state.error = null
//       })
//       .addCase(getProfile.rejected, (state, action) => {
//         state.isLoading = false
//         state.user = null
//         state.accessToken = null
//         state.isAuthenticated = false
//         state.error = action.payload || { message: 'Fetch user failed', code: 'FETCH_USER_FAILED' }
//       })
//   },
// })

// export const { clearError, setAccessToken, logOut } = authSlice.actions
// export const authReducer = authSlice.reducer
