import { Routes, Route, Navigate } from 'react-router-dom'

// import DashboardPage from '@/pages/DashboardPage';
// import AdminPage from '@/pages/AdminPage';
// import UnauthorizedPage from '@/pages/UnauthorizedPage';
import LoginPage from '../pages/LoginPage/LoginPage'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import SharedLayout from '../layouts/SharedLayout'
import DashboardPage from '../pages/DashboardPage/DashboardPage'

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

    <Route
      path="/"
      element={
        <PrivateRoute>
          <SharedLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
)

export default AppRouter
