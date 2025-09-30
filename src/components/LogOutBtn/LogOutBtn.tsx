import React from 'react'
import { useAppDispatch } from '../../store/hooks'
import { logOutUser } from '../../store/authSlice/operations'
import { useNavigate } from 'react-router-dom'

const LogOutBtn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await dispatch(logOutUser())
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

export default LogOutBtn
