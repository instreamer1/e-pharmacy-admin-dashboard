import { NavLink } from 'react-router-dom'




interface SidebarMenuProps {
  
  onClose: () => void
}

const SidebarMenu = ({ onClose}: SidebarMenuProps) => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/allProducts', label: 'Products', icon: '📦' },
    { to: '/suppliers', label: 'Suppliers', icon: '🏢' },
    { to: '/customers', label: 'Customers', icon: '👥' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => {
                  // Закрываем сайдбар на mobile/tablet при клике на ссылку
                  if (window.innerWidth < 768) {
                    onClose()
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm md:text-base ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                  }`
                }
              >
                <span onClick={onClose} className="mr-3 text-base">{item.icon}</span>
                {/* <span>{item.label}</span> */}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Адаптивная дополнительная информация */}
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
