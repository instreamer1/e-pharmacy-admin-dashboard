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

    // class=" min-w-[320px] max-w-full  sm:max-w-[375px] md:max-w-[768px] lg:max-w-[1440px] md:min-h-[1024px] lg:min-h-[800px] "
  return (
    <>
    {/* <div className="flex flex-col min-h-screen  md:max-w-[768px] lg:max-w-[1440px] md:min-h-[1024px] lg:min-h-[800px]"> */}
      <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="lg:flex relative  min-w-80 mx-auto max-w-[375px] md:max-w-[768px] lg:max-w-[1440px]">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="lg:flex-1 ">
          <Outlet />
        </main>
      </div>
      {/* </div> */}
    </>
  )
}

export default SharedLayout
