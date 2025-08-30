export const useAuth = () => {
  // пример: токен хранится в localStorage, user в context
//   const { user } = useContext(AuthContext);

  return {
    // isAuthenticated: !!user,
    // user, // { id, email, role: 'admin' }
  };
};
