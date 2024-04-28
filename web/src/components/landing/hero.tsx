import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Typed from 'typed.js';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Gradient } from '../ui/gradient';
import { Search } from 'lucide-react';

const categories: string[] = ['Schedule', 'Plan', 'Project'];

export function Hero() {
  const typedElement: RefObject<HTMLSpanElement> =
    useRef<HTMLSpanElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [...categories, 'Schedule'],
      startDelay: 300,
      typeSpeed: 120,
      backSpeed: 200,
      backDelay: 300,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="relative pb-20 pt-40 lg:pt-44">
      <Gradient />
      <div className="relative m-auto px-6 xl:container md:px-12 lg:px-6">
        <h3 className="mb-4 mt-4 max-w-2xl pb-2 text-center text-2xl font-normal dark:text-white lg:text-left">
          Expert categories: <span ref={typedElement}></span>
        </h3>
        <h1 className="text-center text-4xl font-black text-blue-900 dark:text-white sm:mx-auto sm:w-10/12 sm:text-5xl md:w-10/12 md:text-5xl lg:w-auto lg:text-left xl:text-7xl">
          Manage your job
          <br className="hidden lg:block" />{' '}
          <span className="relative bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
            smartly with MyNote
          </span>
          .
        </h1>
        <div className="lg:flex">
          <div className="relative mt-8 space-y-8 text-center sm:mx-auto sm:w-10/12 md:mt-16 md:w-2/3 lg:ml-0 lg:mr-auto lg:w-7/12 lg:text-left">
            <div className="flex w-full justify-between gap-6 lg:gap-12">
              <form
                className="mx-auto flex w-full items-center gap-2"
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                }}
              >
                <div className="relative h-12 w-full rounded-xl border border-solid border-gray-600">
                  <Input
                    type="text"
                    className="h-full w-[calc(100%-3.5rem)] rounded-xl border-none bg-transparent px-4 py-1 focus:outline-none"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(event: ChangeEvent) => {
                      setSearchTerm((event.target as HTMLInputElement).value);
                    }}
                  />
                  <Button
                    variant="ghost"
                    type="submit"
                    className="absolute -top-1 right-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl hover:bg-transparent"
                  >
                    <Search className="h-full w-full" />
                  </Button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:flex sm:justify-center lg:justify-start">
              {categories.map((category: string) => (
                <div
                  key={uuidv4()}
                  className="w-full min-w-0 cursor-pointer rounded-full border border-gray-200 p-4 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-300/30"
                >
                  <div className="flex justify-center">
                    <span className="block truncate font-medium dark:text-white">
                      <div>{category}</div>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="-right-10 hidden lg:col-span-2 lg:mt-0 lg:flex">
            <div className="relative w-full">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                className="relative w-full"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
