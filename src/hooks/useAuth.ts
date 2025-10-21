// hooks/useAuth.ts

import { selectUser, selectIsAuthenticated, selectIsLoading } from '../store/authSlice/selectors'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { useMemo } from 'react'
import { logInUser, logOutUser, getProfile } from '../store/authSlice/operations'
import { ROLES, type Role } from '../constants/roles'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading) // ✅ Добавить селектор

  return useMemo(
    () => ({
      user,
      isAuthenticated, // ✅ Добавляем в возвращаемый объект
      isLoading,
      
      login: (credentials) => dispatch(logInUser(credentials)),
      logout: () => dispatch(logOutUser()),
      getProfile: () => dispatch(getProfile()),

      // ✅ Проверка одной роли
    hasRole: (role: Role) => {
      return user?.roles?.includes(role) || false;
    },
    
    // ✅ Проверка любой роли из массива
    hasAnyRole: (roles: Role[]) => {
      return roles.some(role => user?.roles?.includes(role)) || false;
    },
    
    // ✅ Проверка всех ролей из массива
    hasAllRoles: (roles: Role[]) => {
      return roles.every(role => user?.roles?.includes(role)) || false;
    },
    
    // ✅ Специфичные проверки
    isAdmin: () => user?.roles?.includes(ROLES.ADMIN) || false,
    isModerator: () => user?.roles?.includes(ROLES.MODERATOR) || false,
    isPharmacist: () => user?.roles?.includes(ROLES.PHARMACIST) || false,

        // ✅ Проверка доступа к модулям
    canAccessAdminPanel: () => 
      user?.roles?.some(role => [ROLES.ADMIN, ROLES.MODERATOR].includes(role)) || false,
      
    canAccessPharmacy: () =>
      user?.roles?.some(role => [ROLES.PHARMACIST, ROLES.ADMIN].includes(role)) || false,
    }),
    
    [user, isAuthenticated, isLoading, dispatch] // ✅ Все зависимости
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
