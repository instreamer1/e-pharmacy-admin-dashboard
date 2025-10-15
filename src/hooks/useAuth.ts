// hooks/useAuth.ts

import { selectUser, selectIsLoggedIn } from '../store/authSlice/selectors';
import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return {
    user: user || null,
    isAuthenticated: Boolean(isLoggedIn),
  };
};