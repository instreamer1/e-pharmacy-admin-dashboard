// components/AdminRoute.jsx

import { ROLES } from '../constants/roles'

import { Navigate } from 'react-router-dom'

// import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './PrivateRoute/ProtectedRoute';

// interface AdminRouteProps {
//   children: React.ReactNode;
// }

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute
      requiredRoles={[ROLES.ADMIN, ROLES.MODERATOR]}
      fallback={<Navigate to="/login" replace />}
    >
      {children}
    </ProtectedRoute>
  )
}

// const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
//   const { isAuthenticated, user, isLoading, hasAnyRole } = useAuth();

  // ✅ Показываем loading пока проверяем авторизацию
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div>Loading...</div>
//       </div>
//     );
//   }

  // ✅ Если не авторизован - на логин
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ Проверяем админские роли
//   const hasAdminAccess = hasAnyRole([ROLES.ADMIN, ROLES.MODERATOR]);
  
//   if (!hasAdminAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

export default AdminRoute;
