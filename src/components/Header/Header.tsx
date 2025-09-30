// components/Header/Header.tsx

import { useAuth } from '../../hooks/useAuth'
import Logo from '../Logo/Logo'
import css from './Header.module.css'
import iconSprite from '../../assets/icons/sprite.svg'
import { useLocation } from 'react-router-dom'

import LogOutBtn from '../LogOutBtn/LogOutBtn'
import { ROUTE_TITLES } from '../../constants/routeTitles'
import type { MouseEventHandler } from 'react'

interface HeaderProps {
  onMenuClick: MouseEventHandler<HTMLButtonElement>
  isDesktop: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isDesktop }) => {
  const location = useLocation()

  const { isAuthenticated, user } = useAuth()


  return (
    <header className="flex items-center bg-background2 border-b border-borderGray  px-5 h-20 ">
      {/* Бургер только на мобилке */}
      {!isDesktop && (
        <button
          className="mr-5"
          onClick={onMenuClick}
          type="button"
          aria-label="aside button"
        >
          <svg className={css.burger}>
            <use href={`${iconSprite}#burger`} />
          </svg>
        </button>
      )}

      <Logo />
      <div className="flex flex-col  items-center gap-1 ml-5">
        <h1 className="">Medicine Store</h1>
        <div className="flex flex-row items-center ">
          <p className="text-gray-500">{ROUTE_TITLES[location.pathname] ?? 'Unknown page'}</p>
          <p className="text-gray-500">{user?.email || 'guest'}</p>
        </div>
      </div>

      {isDesktop && <LogOutBtn />}
    </header>
  )
}

export default Header
