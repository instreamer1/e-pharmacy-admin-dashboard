// components/PrivateRoute/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import type { Role } from '../../constants/roles'
// import { getProfile } from '../../store/authSlice/operations'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: Role[] // ✅ Массив требуемых ролей
  fallback?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallback = <Navigate to="/login" />,
}) => {
  const { isAuthenticated, user, isLoading, hasAnyRole, getProfile  } = useAuth()
  const dispatch = useAppDispatch()
    useEffect(() => {
    // ✅ Загружаем профиль если есть токен но пользователь не загружен
    // const token = localStorage.getItem('accessToken')
     if (!user && !isLoading && !isAuthenticated) {
      getProfile();
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return fallback
  }

  return children
}

export default ProtectedRoute
