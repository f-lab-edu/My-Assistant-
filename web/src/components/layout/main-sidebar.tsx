import logoImg from '@/assets/logo.png';
import { getSidebarItem } from '@/constants/sidebar-item';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from '../ui/mode-toggle';
import { Settings, User } from 'lucide-react';

export default function MainSidebar() {
  const location = useLocation();
  const sidebarItem = getSidebarItem(location.pathname);

  return (
    <div className="flex h-full w-full flex-col items-center px-4">
      <Link
        to="/"
        className="flex w-full flex-col border-b-2 border-solid border-gray-300/70 pb-2.5"
      >
        <img src={logoImg} alt="logo" className="h-12 w-12" />
      </Link>
      <div className="flex flex-col gap-4 border-b-2 border-solid border-gray-300/70 py-4 pb-4">
        {sidebarItem.map((item) => (
          <Link
            to={item.href}
            key={item.id}
            className={cn(
              'group cursor-pointer rounded-md p-2 transition-colors duration-200 hover:bg-blue-500',
              location.pathname === item.href
                ? 'bg-blue-500'
                : 'bg-transparent',
            )}
          >
            {item.icon}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <ModeToggle className="border-none" />
        <Link
          to="/setting"
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-muted',
            location.pathname === '/setting' ? 'bg-muted' : 'bg-transparent',
          )}
        >
          <Settings className="h-5 w-5" />
        </Link>
        <Link to="/sign?type=in">
          <User className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
