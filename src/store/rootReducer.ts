//store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer } from './authSlice/slice.ts'
import { dashboardReducer } from './dashboardSlice/slice.ts'
// persist config только для auth
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'isLoggedIn', 'user'],
}

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  dashboard: dashboardReducer,

  // products: productsReducer,
  // orders: ordersReducer,
})

// Если хочешь глобально чистить стейт (например, при logOutUser.fulfilled), можно в rootReducer завернуть его в функцию:

// const appReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   // другие редьюсеры
// });

// export const rootReducer = (state: any, action: any) => {
//   if (action.type === "auth/logOutUser/fulfilled") {
//     state = undefined; // сброс всех редьюсеров
//   }
//   return appReducer(state, action);
// };
