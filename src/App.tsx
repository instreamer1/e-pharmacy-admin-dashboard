// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'
import './App.css'

import AppRouter from './routes/AppRouter'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './store/hooks'

import { selectIsRefreshing } from './store/authSlice/selectors'
import { refresh } from './store/authSlice/operations'
import { useAuth } from './hooks/useAuth'

const App = () => {
  console.log('🚀 App rendered - ONCE') // Должен показаться ОДИН раз
  const dispatch = useAppDispatch()

  const isRefreshing = useAppSelector(selectIsRefreshing)
  const { accessToken, refreshCall, getProfileCall, isLoading } = useAuth()
  // 1️⃣ Refresh при монтировании
  useEffect(() => {
    let isMounted = true
    const refreshAccessToken = async () => {
      try {
        if (!accessToken && !isRefreshing && isMounted) {
          console.log('🔄 Refreshing token...')
          // await dispatch(refresh());
          await refreshCall()
        }
      } catch (error) {
        console.error('❌ Token refresh failed:', error)
      }
    }

    refreshAccessToken()
    return () => {
      isMounted = false
    }
  }, []) // только при монтировании

  // 2️⃣ Загружаем профиль, когда токен появился
  useEffect(() => {
    if (accessToken) {
      getProfileCall(accessToken)
    }
  }, [accessToken])
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       // ⚠️ Проверяем, есть ли refreshToken (в куках) и нет ли accessToken
  //       // const hasRefreshToken = document.cookie.includes('refreshToken');

  //     if (!accessToken && !isRefreshing) {
  //         console.log('🔄 Refreshing token...');
  //           await dispatch(refresh())
  //         // await refreshCall();
  //       }

  //       // ⚠️ Вызываем getProfile только если токен уже есть
  //       if (accessToken) {
  //         await getProfileCall();
  //       }
  //     } catch (error) {
  //       console.error('❌ Token refresh failed:', error);
  //     }
  //   };

  //   initializeAuth();
  // }, []);
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       // const hasRefreshToken = document.cookie.includes('refreshToken')

  //       // ✅ Обновляем токен только если ЕСТЬ refreshToken но НЕТ accessToken
  //       if (!accessToken && !isRefreshing ) {
  //         console.log('🔄 Refreshing token...')
  //         // await dispatch(refresh())
  //         await refreshCall()
  //       }
  //       getProfileCall()
  //     } catch (error) {
  //       console.error('❌ Token refresh failed:', error)
  //     }
  //   }

  //   initializeAuth()
  // }, [])

  // ✅ Пока идет refresh - показываем loading
  if (isRefreshing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Refreshing session...</div>
      </div>
    )
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
