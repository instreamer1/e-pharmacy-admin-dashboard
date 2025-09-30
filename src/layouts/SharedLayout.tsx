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
      <header className="relative flex  items-center bg-white shadow  px-5 h-20">
        {/* <div className="flex min-h-screen bg-gray-100 text-gray-800"> */}
        <Header onMenuClick={toggleSidebar} isDesktop={isDesktop} />
        {/* </div> */}
        {/* <div className="flex flex-col flex-1"> */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} isDesktop={isDesktop} />
        {/* </div> */}
      </header>
      <main>
        <div className="min-w-[320px] max-w-full mx-auto sm:max-w-[375px] md:max-w-[768px] lg:max-w-[1440px]">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default SharedLayout
