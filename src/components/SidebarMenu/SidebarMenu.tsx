import { NavLink } from 'react-router-dom'
import { navItems, getIconPath } from '../../constants/routeTitles'

interface SidebarMenuProps {
  onClose: () => void
}

const SidebarMenu = ({ onClose }: SidebarMenuProps) => {
  return (
    <>
      <nav className="flex-1 px-5  overflow-y-auto ">
        <ul className="space-y-[14px]">
          {navItems.map((item) => (
            <li
              key={item.to}
              onClick={onClose}
              className="flex items-center justify-center  w-[38px] h-[38px] md:w-11 md:h-11 rounded-full bg-background3 shadow-[0_-1px_7px_0_rgba(71,71,71,0.05)] "
            >
              <NavLink
                to={item.to}
                // className=" flex items-center justify-center x-full h-full"
                className={({ isActive }) =>
                  ` transition-colors duration-200 w-[38px] h-[38px] md:w-11 md:h-11 flex items-center justify-center
                   ${isActive ? 'text-accent' : 'text-text'}
                    hover:text-hover_btn focus:text-hover_btn`
                }
              >
               
                <svg className="w-[14px] h-[14px] md:w-4 md:h-4">
                  <use href={getIconPath(item.icon)} />
                </svg>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-medium text-gray-900 text-sm mb-2 md:text-base">
          Quick Stats
        </h3>
        <p className="text-gray-600 text-xs md:text-sm">
          Last updated: Today
        </p>
      </div> */}
    </>
  )
}

export default SidebarMenu
