import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';

export default function MainNavbar() {
  return (
    <div className="flex h-32 w-full justify-around px-12 pt-5">
      <Link to="/landing" className="text-2xl font-bold text-white">
        MyNote
      </Link>
      <div className="flex gap-6 text-[1rem] font-semibold uppercase text-white">
        <Link to="/info">Info</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button
          variant="ghost"
          size="lg"
          className="rounded-md border border-solid border-gray-300 text-white"
        >
          로그인
        </Button>
      </div>
    </div>
  );
}
