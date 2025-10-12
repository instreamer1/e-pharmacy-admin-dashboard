// hooks/useAuth.ts

import { selectUser, selectIsLoggedIn } from '../store/authSlice/selectors';
import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return {
    user: user || null, // на случай, если user null
    isAuthenticated: isLoggedIn === 'true' || isLoggedIn === true, // если хранится в localStorage как string
  };
};
