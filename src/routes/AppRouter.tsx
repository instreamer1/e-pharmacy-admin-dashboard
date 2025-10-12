import { Routes, Route, Navigate } from 'react-router-dom'

// import UnauthorizedPage from '@/pages/UnauthorizedPage';
import LoginPage from '../pages/LoginPage/LoginPage'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import SharedLayout from '../layouts/SharedLayout'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import { useAuth } from '../hooks/useAuth'
import AllProductsPage from '../pages/AllProductsPage/AllProductsPage'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import { ROLES } from '../constants/roles'

const AppRouter = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* Unauthorized page */}
      {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

      {/* Protected routes */}
      <Route
        path="/"
        element={
         <PrivateRoute requiredRoles={[ROLES.ADMIN]}>
            <SharedLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="allProducts" element={<AllProductsPage />} />

        {/* Example admin route */}
        {/* <Route
          path="admin"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <AdminPage />
            </RoleRoute>
          }
        /> */}
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      {/* 404 */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default AppRouter
