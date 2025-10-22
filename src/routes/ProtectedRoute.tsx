// ProtectedRoute.tsx

import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../constants/roles'
// import { getProfile } from '../../store/authSlice/operations'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: Role[]
  fallback?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallback = <Navigate to="/login" replace />, // ✅ Добавить replace
}) => {
  const { isAuthenticated, user, accessToken, isLoading, getProfileCall, hasAnyRole } = useAuth()
 console.log('🔐 ProtectedRoute check:', { 
    accessToken: !!accessToken, 
    isAuthenticated, 
    user: !!user,
    isLoading 
  })
  useEffect(() => {
    // ✅ Загружаем профиль только если:
    // - Есть accessToken (пользователь аутентифицирован)
    // - Нет данных пользователя (профиль не загружен)  
    // - Не идет уже загрузка
    if (accessToken && !user && !isLoading) {
      console.log('📥 Loading user profile...')
      getProfileCall()
    }
  }, [accessToken, user, isLoading, getProfileCall])

  if (isLoading) {
    return <div>Loading...</div>
  }

  // ✅ Проверяем в правильном порядке:
  if (!accessToken) {
     console.log('➡️ Redirecting to login - no access token')
    return <Navigate to="/login" replace />
  }

  if (!user) {
    console.log('⏳ Waiting for user profile...')
    return <div>Loading user data...</div>
  }

  // ✅ Если пользователь есть, но не хватает ролей
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    console.log('🚫 Insufficient permissions')
    return fallback
  }
 console.log('✅ Access granted!')
  return children
}

export default ProtectedRoute
