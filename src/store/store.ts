//store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { rootReducer } from "./rootReducer";
import { authMiddleware } from "./middleware/authMiddleware"; 
import { setupApiInterceptors } from "../services/apiSetup";
// import { setupApiInterceptors } from "../services/apiSetup";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: { persistor: null }},
    }).concat(authMiddleware),
});

setupApiInterceptors();

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




