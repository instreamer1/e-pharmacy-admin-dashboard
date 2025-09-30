// components/Sidebar/Sidebar.tsx
import css from "./Sidebar.module.css"
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import iconSprite from '../../assets/icons/sprite.svg'
import LogOutBtn from "../LogOutBtn/LogOutBtn"
const Sidebar = ({ isOpen, onClose, isDesktop }) => {
  if (!isOpen) return null

  return (
    <aside className=" absolute left-0 top-0 w-78 bg-white rounded-lg shadow-sm border p-4 md:p-6">
      <div className=" inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex justify-between items-center p-4 border-b">
      
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Закрыть меню"
        >
           <svg className={css.burger}>
          <use href={`${iconSprite}#closeModal`}></use>
        </svg>
        </button>
      </div>

      <SidebarMenu />
    { !isDesktop && <LogOutBtn />}
    </aside>
  )
}

export default Sidebar
