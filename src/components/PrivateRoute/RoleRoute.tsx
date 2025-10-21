import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface RoleRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const RoleRoute = ({ allowedRoles, children }: RoleRouteProps) => {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return children;
};

export default RoleRoute;
