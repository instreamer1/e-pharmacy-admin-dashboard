import { useSelector } from 'react-redux';
import { selectUser, selectIsLoggedIn } from '../store/authSlice/selectors';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return {
    user,
    isAuthenticated: isLoggedIn,
  };
};
