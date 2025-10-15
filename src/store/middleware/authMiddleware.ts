import { logOutUser } from '../authSlice/operations.js'

export const authMiddleware = (store) => (next) => (action) => {
  if (
    action.type.endsWith("rejected") &&
    action.payload?.response?.status === 401
  ) {
    
    if (!action.meta?.arg?.isRefreshRequest) {
      store.dispatch(logOutUser());
    }
  }

  return next(action);
};
