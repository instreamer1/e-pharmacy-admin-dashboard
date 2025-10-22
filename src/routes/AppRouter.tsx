//src/routes/AppRouter

import { Routes, Route, Navigate } from 'react-router-dom'

// import UnauthorizedPage from '@/pages/UnauthorizedPage';
import LoginPage from '../pages/auth/LoginPage/LoginPage.tsx'
import SharedLayout from '../layouts/SharedLayout'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import { useAuth } from '../hooks/useAuth'
import AllProductsPage from '../pages/AllProductsPage/AllProductsPage'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import { ROLES } from '../constants/roles'
import AdminRoute from '../components/AdminRoute.tsx'
import PublicRoute from './PublicRoute.tsx'
const AppRouter = () => {
  // const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
           </PublicRoute> 
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          // <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
          <AdminRoute>
            <SharedLayout />
          </AdminRoute>
          //  </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="allProducts" element={<AllProductsPage />} />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      {/* 404 */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default AppRouter
