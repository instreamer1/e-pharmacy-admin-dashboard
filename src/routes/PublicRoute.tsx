import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
   const { isAuthenticated, accessToken, isLoading } = useAuth()

  console.log('🌐 PublicRoute check:', { accessToken: !!accessToken, isAuthenticated, isLoading })

  if (isLoading) {
    return <div>Loading...</div>
  }

  // ✅ Если пользователь уже авторизован - редирект на dashboard
  if (accessToken && isAuthenticated) {
    console.log('➡️ Redirecting to dashboard - already authenticated')
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default PublicRoute
