// layouts/SharedLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

const SharedLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;
