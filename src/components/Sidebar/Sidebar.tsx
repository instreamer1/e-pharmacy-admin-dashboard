// components/Sidebar/Sidebar.tsx
import css from './Sidebar.module.css'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import iconSprite from '../../assets/icons/sprite.svg'
import LogOutBtn from '../LogOutBtn/LogOutBtn'
import { useEffect } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[var(--backdrop)] z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          bg-background2 h-full py-5
          fixed top-0 w-[78px]  transform transition-transform duration-300 
          ${isOpen ? 'translate-x-0 z-50 ' : '-translate-x-full -z-50  '}
          md:w-[84px] md:max-h-[1024px]
          lg:static lg:translate-x-0 lg:block lg:h-auto  lg:z-0 lg:border-r lg:border-borderGray
          flex flex-col 
        `}
        aria-label="Main navigation"
        aria-hidden={!isOpen && true}
      >
        <div className=" ml-8 mb-10 md:mb-12 md:ml-[38px] lg:hidden">
          <button
            onClick={onClose}
            className=" rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg
              //  className={css.burger}
              className="w-8 h-8 stroke-black"
            >
              <use href={`${iconSprite}#closeModal`} />
            </svg>
          </button>
        </div>

        <SidebarMenu onClose={onClose} />
        <div className="mt-auto px-5 w-[38px] h-[38px] md:w-11 md:h-11 lg:hidden">
        <LogOutBtn />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
