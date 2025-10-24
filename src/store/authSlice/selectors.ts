import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const selectAuthState = (state: RootState) => state.auth

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
)

export const selectAccessToken = createSelector(
  [selectAuthState], 
  (auth) => auth.tokens.accessToken
)

export const selectIsLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
)

export const selectTokens = createSelector(
  [selectAuthState],
  (auth) => ({
    accessToken: auth.tokens.accessToken,
    expiresIn: auth.tokens.expiresIn
  })
)

export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
)

export const selectUserRoles = createSelector(
  [selectUser],
  (user) => user?.roles || []
)

export const selectIsAdmin = createSelector(
  [selectUserRoles],
  (roles) => roles.includes('admin')
)

// export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
// export const selectTokens = (state: RootState) => state.auth.tokens
export const selectIsRefreshing = (state) => state.auth.isRefreshing
export const selectIsOpenLoginModal = (state) => state.auth.loginModalOpen
export const selectIsOpenRegisterModal = (state) => state.auth.registerModalOpen
// export const selectIsLoading = (state) => state.auth.isLoading
// export const selectError = (state) => state.auth.error
