import { cn } from '@/lib/utils';
import { Calendar, Code, Book, Bell } from 'lucide-react';

export const getSidebarItem = (pathname: string) => {
  return [
    {
      id: '1',
      title: 'Docs',
      icon: (
        <Book
          className={cn(
            'h-5 w-5 transition-colors duration-200 group-hover:text-white',
            pathname === '/'
              ? 'text-white dark:text-white'
              : 'text-black dark:text-white',
          )}
        />
      ),
      href: '/',
    },
    {
      id: '2',
      title: 'Project',
      icon: (
        <Code
          className={cn(
            'h-5 w-5 transition-colors duration-200 group-hover:text-white',
            pathname === '/project'
              ? 'text-white dark:text-white'
              : 'text-black dark:text-white',
          )}
        />
      ),
      href: '/project',
    },
    {
      id: '3',
      title: 'Schedule',
      icon: (
        <Calendar
          className={cn(
            'h-5 w-5 transition-colors duration-200 group-hover:text-white',
            pathname === '/schedule'
              ? 'text-white dark:text-white'
              : 'text-black dark:text-white',
          )}
        />
      ),
      href: '/schedule',
    },
    {
      id: '4',
      title: 'Notification',
      icon: (
        <Bell
          className={cn(
            'h-5 w-5 transition-colors duration-200 group-hover:text-white',
            pathname === '/notification'
              ? 'text-white dark:text-white'
              : 'text-black dark:text-white',
          )}
        />
      ),
      href: '/notification',
    },
  ];
};
