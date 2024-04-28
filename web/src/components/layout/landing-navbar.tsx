import { Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function LandingNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex w-full items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/landing" className="flex items-center gap-2">
            <img className="h-14 w-14" src={logoImg} alt="logo" />
            <span className="hidden font-semibold sm:block">MyNote</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
          <ModeToggle />
          <Link
            to="/sign?type=in"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
