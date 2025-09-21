import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth(); // user.role, например: 'admin'

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (requiredRoles && !requiredRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default PrivateRoute;

