// components/Header/Header.tsx
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../Logo/Logo'

import { useAppDispatch } from '../../store/hooks'
import { logOutUser } from '../../store/authSlice/operations'

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const handleLogout = async () => {
    await dispatch(logOutUser());
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <Logo />
      {/* <Link to={user ? '/' : '/login'} className="font-bold text-blue-600 text-xl">
        MedicineStore
      </Link> */}

 
      <h1 className="text-lg font-semibold">Medicine Store</h1>

    
      <nav className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
          Dashboard
        </Link>
        <span className="text-gray-500">{user?.email || 'guest'}</span>
      </nav>

   
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  )
}

export default Header
