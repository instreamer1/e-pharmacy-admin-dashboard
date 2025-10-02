// layouts/SharedLayout.tsx
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import { useState } from 'react'

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <div className=" min-w-[320px] max-w-full mx-auto sm:max-w-[375px] md:max-w-[768px] lg:max-w-[1440px] bg-accent">
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          <main className="flex-1 transition-all p-4  min-h-[800px] lg:pl-20">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default SharedLayout
