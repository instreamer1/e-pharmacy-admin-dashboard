// layouts/SharedLayout.tsx
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import { useCallback, useState } from 'react'

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])
  
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 h- h-full bg-background2">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="flex-1  ">
          <Outlet />
        </main>
      </div>
      </div>
    </>
  )
}

export default SharedLayout
