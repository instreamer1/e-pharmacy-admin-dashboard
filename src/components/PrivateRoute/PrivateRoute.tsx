// components/PrivateRoute/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';


import { useAuth } from '../../hooks/useAuth';
import type { Role } from '../../constants/roles';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRoles?: Role[]; // строго типизировано
}

const PrivateRoute = ({ children, requiredRoles }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user?.role || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute
