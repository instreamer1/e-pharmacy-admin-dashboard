// layouts/SharedLayout.tsx
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' })
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <div className="relative min-w-[320px] max-w-full mx-auto sm:max-w-[375px] md:max-w-[768px] lg:max-w-[1440px]">
        <Header onMenuClick={toggleSidebar} isDesktop={isDesktop} />

        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} isDesktop={isDesktop} />
      </div>
      <main
        className={`
          flex-1 transition-all p-4 
          ${isDesktop ? 'ml-16' : ''} 
        `}
      >
        <div className="min-w-[320px] max-w-full mx-auto sm:max-w-[375px] md:max-w-[768px] lg:max-w-[1440px] b-accent">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default SharedLayout
