import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  children: React.ReactNode;
  requiredRoles?: string[]; // например, ['admin']
};

const PrivateRoute = ({ children, requiredRoles }: Props) => {
  const { isAuthenticated, user } = useAuth(); // user.role, например: 'admin'

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

