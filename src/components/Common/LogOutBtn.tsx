import { useAppDispatch } from '../../store/hooks'
import { logOutUser } from '../../store/authSlice/operations'
import { useNavigate } from 'react-router-dom'
import iconSprite from '../../assets/icons/sprite.svg'
import { useAuth } from '../../hooks/useAuth'

const LogOutBtn = () => {
  const {logout}= useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
     try {
     console.log('🔄 Starting logout...')
    // await dispatch(logOutUser())
   logout()
     console.log('➡️ Redirecting to login...')
      navigate('/login', { replace: true })
  }catch (error) {
      console.error('❌ Logout error:', error)
      // ✅ Все равно редиректим на логин даже при ошибке
      navigate('/login', { replace: true })
    }
  }

  return (
    <>
      {/* <div
           className="
         mt-auto flex items-center justify-center  lg:block
       "
      > */}
      <button onClick={handleLogout} className="p-0 w-[38px] h-[38px] md:w-11 md:h-11">
        <svg className="w-full h-full hover:text-hover_btn focus:text-hover_btn">
          <use href={`${iconSprite}#icon-logout`} />
        </svg>
      </button>
      {/* </div> */}
    </>
  )
}

export default LogOutBtn
