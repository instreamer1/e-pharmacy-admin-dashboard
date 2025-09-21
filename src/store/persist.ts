// src/store/persist.ts
import type { Persistor } from 'redux-persist'
// 
import { persistReducer } from 'redux-persist'
import type { Reducer } from '@reduxjs/toolkit';
import type { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

export const purgePersistedState = async (persistor: Persistor) => {
  try {
    if (persistor) {
      await persistor.purge()
    }

    Object.keys(localStorage)
      .filter(key => key.startsWith('persist:'))
      .forEach(key => localStorage.removeItem(key))
  } catch (err) {
    console.error('purgePersistedState failed:', err)
  }
}





export const getPersistResetReducer = <
  S extends PersistPartial, 
  A extends { type: string }
>(
  reducer: Reducer<S, A>,
  initialState: S
): Reducer<S, A> => {
  return (state: S | undefined, action: A): S => {
    if (action.type === 'RESET_STATE') {
      const persistedReducer = persistReducer(
        { key: 'auth', storage },
        reducer
      )
      return persistedReducer(initialState, action)
    }

    return reducer(state, action)
  }
}