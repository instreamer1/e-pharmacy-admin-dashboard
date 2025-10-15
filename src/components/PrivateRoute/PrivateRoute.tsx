// components/PrivateRoute/PrivateRoute.tsx
import { Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import type { Role } from '../../constants/roles'
import { useAppSelector } from '../../store/hooks'
import { selectIsRefreshing } from '../../store/authSlice/selectors'

interface PrivateRouteProps {
  children: JSX.Element
  requiredRoles?: Role[]
}

const PrivateRoute = ({ children, requiredRoles }: PrivateRouteProps) => {
  const isRefreshing = useAppSelector(selectIsRefreshing)
  const { isAuthenticated, user } = useAuth()

  if (isRefreshing) {
    return <div>Loading...</div> // Или спиннер
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  console.log('PrivateRoute', user)
  if (requiredRoles && (!user || !requiredRoles.includes(user.role))) {
    return  (
       // console.log("object");
    <Navigate to="/unauthorized" replace />
    )
   
  }

  return children
}

export default PrivateRoute
