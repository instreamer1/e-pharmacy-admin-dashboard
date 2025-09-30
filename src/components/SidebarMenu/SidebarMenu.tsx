import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/allProducts", label: "Products", icon: "📦" },
    { to: "/suppliers", label: "Suppliers", icon: "🏢" },
    { to: "/customers", label: "Customers", icon: "👥" },
    { to: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm md:text-base ${
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
              }`
            }
          >
            <span className="mr-3 text-base">{item.icon}</span>
            {/* <span>{item.label}</span> */}
          </NavLink>
        ))}
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
  );
};

export default SidebarMenu;