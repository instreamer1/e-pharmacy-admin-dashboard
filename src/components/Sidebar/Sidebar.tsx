// components/Sidebar/Sidebar.tsx
import css from './Sidebar.module.css'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import iconSprite from '../../assets/icons/sprite.svg'
import LogOutBtn from '../LogOutBtn/LogOutBtn'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-[var(--backdrop)] z-40 lg:hidden" onClick={onClose}  aria-hidden="true"/>
      )}
      <aside
        className={`
          bg-background2 border-r border-borderGray
          fixed top-0 h-full w-20 transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-y-full'}
          md:max-h-[1024px]
          lg:static lg:translate-y-0 lg:block lg:min-h-[800px]
        `}

        aria-label="Main navigation"
      >
        <div className=" flex justify-end p-4 border-b lg:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg
              //  className={css.burger}
              className="w-5 h-5 stroke-[#59b17a]"
            >
              <use href={`${iconSprite}#closeModal`} />
            </svg>
          </button>
        </div>

        <SidebarMenu onClose={onClose} />
        <div className="lg:hidden">
          <LogOutBtn />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
