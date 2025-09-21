// components/Sidebar/Sidebar.tsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg h-full p-6">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>
                <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Products
        </NavLink>
                <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Suppliers
        </NavLink>
                <NavLink
          to="/customers"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Customers
        </NavLink>
                <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Settings
        </NavLink>

        {/* при необходимости добавишь сюда другие пункты */}
      </nav>
    </aside>
  );
};

export default Sidebar;
