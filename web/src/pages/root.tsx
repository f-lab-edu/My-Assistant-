import MainSidebar from '@/components/layout/main-sidebar';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="flex min-h-screen max-w-full">
      <div className="sticky top-0 h-full min-h-screen w-20 border-r border-solid border-gray-300/70 pt-2">
        <MainSidebar />
      </div>
      <div className="h-full w-[calc(100%-5rem)]">
        <Outlet />
      </div>
    </div>
  );
}
