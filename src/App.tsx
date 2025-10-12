// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'
import './App.css'

import AppRouter from './routes/AppRouter'
import { useEffect } from 'react'
import { refresh } from './store/authSlice/operations'
import { useAppDispatch } from './store/hooks'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(refresh())
  }, [])

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
