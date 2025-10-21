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
  whitelist: ['user', 'isAuthenticated'],
}

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  dashboard: dashboardReducer,

  // products: productsReducer,
  // orders: ordersReducer,
})
