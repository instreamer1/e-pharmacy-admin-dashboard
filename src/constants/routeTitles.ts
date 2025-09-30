export const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/allProducts': 'All products',
  '/dashboard': 'Dashboard',
  '/orders': 'Orders',
  '/customers': 'Customers',
}

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/allProducts", label: "Products", icon: "📦" },
    { to: "/suppliers", label: "Suppliers", icon: "🏢" },
    { to: "/customers", label: "Customers", icon: "👥" },
    { to: "/settings", label: "Settings", icon: "⚙️" },
  ];