// components/Header/Header.tsx

import { useAuth } from '../../hooks/useAuth'
import Logo from '../Logo/Logo'
import css from './Header.module.css'
import iconSprite from '../../assets/icons/sprite.svg'
import { useLocation } from 'react-router-dom'

import LogOutBtn from '../Common/LogOutBtn'
import { ROUTE_TITLES } from '../../constants/routeTitles'
import type { MouseEventHandler } from 'react'

interface HeaderProps {
  onMenuClick: MouseEventHandler<HTMLButtonElement>
  isSidebarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
  const location = useLocation()

  const { isAuthenticated, user } = useAuth()

  return (
    <header className="min-w-80 max-w-[375px] mx-auto md:max-w-[768px] lg:max-w-[1440px] flex items-center bg-background2 border-b border-borderGray h-20 px-5 md:px-8 py-[17px] lg:px-5">
      <button
        className=" mr-2 md:mr-4 lg:hidden"
        onClick={onMenuClick}
        type="button"
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
      >
        <svg className={css.burger}>
          <use href={`${iconSprite}#burger`} />
        </svg>
      </button>

      <Logo />
      <div className="flex flex-col  items-center gap-1 ml-5 md:ml-8 lg:ml-[60px]">
        <h1 className="">Medicine Store</h1>
        <div className="flex flex-row items-center ">
          <p className="text-gray-500">
            {ROUTE_TITLES[location.pathname] ?? 'Unknown page'} | {user?.email || 'guest'}
          </p>
        </div>
      </div>

      <div className="hidden  w-[38px] h-[38px]  lg:block ml-auto">
        <LogOutBtn />
      </div>
    </header>
  )
}

export default Header
