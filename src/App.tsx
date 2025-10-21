// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'
import './App.css'

import AppRouter from './routes/AppRouter'
import { useEffect } from 'react'
// import { fetchCurrentUser, refresh } from './store/authSlice/operations'

import { useAppDispatch, useAppSelector } from './store/hooks'

import { selectIsRefreshing } from './store/authSlice/selectors'
import { refresh } from './store/authSlice/operations'

const App = () => {
  const dispatch = useAppDispatch()

  const isRefreshing = useAppSelector(selectIsRefreshing)
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       const accessToken = localStorage.getItem('accessToken')
  //       const hasRefreshToken = document.cookie.includes('refreshToken')

  //       // ✅ Только если есть refreshToken но нет accessToken
  //       if (!accessToken && hasRefreshToken && !isRefreshing) {
  //         console.log('🔄 Attempting to refresh token...')
  //         // const result = await dispatch(refresh()).unwrap()
  //         // console.log('✅ Token refreshed successfully')
  //       } else if (accessToken) {
  //         console.log('✅ Access token found, app ready')
  //       // } else {
  //       //   console.log('🔐 No tokens found, user needs to login')
  //       }
  //     } catch (error) {
  //       console.error('❌ Token refresh failed:', error)
  //       // ✅ Автоматически очищаем невалидные токены
  //       localStorage.removeItem('accessToken')
  //     }
  //   }

  //   initializeAuth()
  // }, [dispatch, isRefreshing])

  useEffect(() => {
    const useAuthInit = async () => {
      try {
      
if ( !isRefreshing) {
        dispatch(refresh())
}
      } catch (error) {
        console.error('❌ Token refresh failed:', error)
        // ✅ Автоматически очищаем невалидные токены
        // localStorage.removeItem('accessToken')
      }
    }
    useAuthInit()
  }, [dispatch])

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
