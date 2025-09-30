// components/Sidebar/Sidebar.tsx
import css from './Sidebar.module.css'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import iconSprite from '../../assets/icons/sprite.svg'
import LogOutBtn from '../LogOutBtn/LogOutBtn'

interface SidebarProps {
  isOpen: boolean
  isDesktop: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose, isDesktop }: SidebarProps) => {
 
  if (!isDesktop && !isOpen) return null

  return (
    <>
     
      {!isDesktop && isOpen && (
        <div className="fixed inset-0 bg-[var(--backdrop)] z-1" onClick={onClose} />
      )}
      <aside
        className={` bg-background2 z-10 
          ${
            isDesktop
              ? 'absolute top-50  w-20 h-[calc(100vh-5rem)] border-r border-borderGray ' 
              : 'absolute top-0   h-[calc(100vh-0rem)] w-20 '
          }                 
        `}
      >
       
        {!isDesktop && (
          <div className="flex justify-end p-4 border-b">
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className={css.burger}>
                <use href={`${iconSprite}#closeModal`} />
              </svg>
            </button>
          </div>
        )}

        <SidebarMenu onClose={onClose} />
        {!isDesktop && <LogOutBtn />}
      </aside>
    </>
  )
}

export default Sidebar
