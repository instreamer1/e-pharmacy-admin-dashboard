// hooks/useAuth.ts

import {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectTokens,
} from '../store/authSlice/selectors'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { useCallback, useMemo } from 'react'
import { logInUser, logOutUser, getProfile, refresh } from '../store/authSlice/operations'
import { ROLES, type Role } from '../constants/roles'
import { tokenStorage } from '../utils/TokenStorage'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const { accessToken, expiresIn } = useAppSelector(selectTokens)
  const error = useAppSelector(selectError)

  const login = useCallback(
    async (credentials) => {
      const result = await dispatch(logInUser(credentials)).unwrap()
      return result // { accessToken, expires_in }
    },
    [dispatch],
  )

  const logout = useCallback(() => {
    return dispatch(logOutUser())
  }, [dispatch])

  const getProfileCall = useCallback(() => {
    return dispatch(getProfile())
  }, [dispatch])

  const refreshCall = useCallback(() => {
    return dispatch(refresh())
  }, [dispatch])

  return useMemo(
    () => {
      console.log('🔄 useAuth computed:', {
        accessToken: !!accessToken,
        user: !!user,
        isLoading,
      })
      console.log('🔑 Token from storage:', tokenStorage.getToken())
      console.log(tokenStorage.getToken())
      return {
        // State
        user,
        isAuthenticated,
        isLoading,
        accessToken,
        expiresIn,
        error,
        // Actions
        login,
        logout,
        getProfileCall, 
        refreshCall,
        // Role checks
        // ✅ Проверка одной роли
        hasRole: (role: Role) => {
          return user?.roles?.includes(role) || false
        },

        // ✅ Проверка любой роли из массива
        hasAnyRole: (roles: Role[]) => {
          return roles.some((role) => user?.roles?.includes(role)) || false
        },

        // ✅ Проверка всех ролей из массива
        hasAllRoles: (roles: Role[]) => {
          return roles.every((role) => user?.roles?.includes(role)) || false
        },

        // ✅ Специфичные проверки
        isAdmin: () => user?.roles?.includes(ROLES.ADMIN) || false,
        isModerator: () => user?.roles?.includes(ROLES.MODERATOR) || false,
        isPharmacist: () => user?.roles?.includes(ROLES.PHARMACIST) || false,

        // ✅ Проверка доступа к модулям
        canAccessAdminPanel: () =>
          user?.roles?.some((role) => [ROLES.ADMIN, ROLES.MODERATOR].includes(role)) || false,

        canAccessPharmacy: () =>
          user?.roles?.some((role) => [ROLES.PHARMACIST, ROLES.ADMIN].includes(role)) || false,
      }
    },

    [  user,
        isAuthenticated,
        isLoading,
        accessToken,
        expiresIn,
        error,
        login,
        logout,
        getProfileCall, 
        refreshCall], // ✅ Все зависимости
  )
}

// export const ROLES = {
//   SUPER:'super_admin',
//   ADMIN: 'admin',
//   CLIENT: 'client',
//   PHARMACIST: 'pharmacist',
// } as const;
// export const useAuth = () => {
//   const user = useAppSelector(selectUser)
//   const isAuthenticated = useAppSelector(selectIsAuthenticated)
//   console.log(user)
//   return {
//     user: user || null,
//     isAuthenticated: Boolean(isAuthenticated),
//   }
// }
