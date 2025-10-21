import iconSprite from '../assets/icons/sprite.svg'

export enum IconId {
  Dashboard = 'icon-dashboard',
  Products = 'icon-shopping-cart',
  Suppliers = 'icon-mingcute_flask-fill',
  Customers = 'icon-mdi_local-pharmacy',
  Settings = 'icon-mdi_users',
  Money = 'icon-streamline_money-cash',
}

export const getIconPath = (id: IconId) => `${iconSprite}#${id}`

export interface NavItem {
  to: string
  label: string
  icon: IconId
}

export const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: IconId.Dashboard },
  { to: '/allProducts', label: 'Products', icon: IconId.Products },
  { to: '/suppliers', label: 'Suppliers', icon: IconId.Suppliers },
  { to: '/customers', label: 'Customers', icon: IconId.Customers },
  { to: '/settings', label: 'Settings', icon: IconId.Settings },
  {  to: '', label: 'Money', icon: IconId.Money },
]

export const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/allProducts': 'All products',
  '/dashboard': 'Dashboard',
  '/orders': 'Orders',
  '/customers': 'Customers',
}
