// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'
import './App.css'

import AppRouter from './routes/AppRouter'
import { useEffect } from 'react'
import { fetchCurrentUser, refresh } from './store/authSlice/operations'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { useAuth } from './hooks/useAuth'
import { selectIsRefreshing } from './store/authSlice/selectors'

const App = () => {
  const dispatch = useAppDispatch()
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // 🟢 Шаг 1: обновляем токен
    dispatch(refresh())
      .unwrap()
      .then(() => {
        // 🟢 Шаг 2: получаем данные пользователя
        dispatch(fetchCurrentUser());
      })
      .catch(() => {
        // Если refresh не удался — ничего не делаем, просто считаем, что пользователь не авторизован
      });
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>; // Или спиннер, пока идет refresh
  }

  return (
    <>
      <AppRouter />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: '20px',
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#2e7d32',
            },
          },
          error: {
            style: {
              background: '#c62828',
            },
          },
        }}
      />
    </>
  )
}

export default App
