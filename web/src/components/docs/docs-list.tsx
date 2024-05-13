import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '../ui/skeleton';
import { createRandomKeys } from '@/lib/utils';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type DocsListType = {
  id: string;
  title: string;
  icon: JSX.Element;
  list?: ITaskType[];
};

export default function DocsList({ id, title, icon, list }: DocsListType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const skeletonRandomKey = useMemo(() => createRandomKeys(5), []);

  return (
    <div className="mb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value={id}>
          <AccordionTrigger>
            <div className="flex items-center gap-4">
              {icon} {title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex cursor-pointer flex-col gap-4 pl-8">
              {list ? (
                list.length > 0 ? (
                  list.map((item) => (
                    <div
                      onClick={() => {
                        if (!type) {
                          setSearchParams({ taskid: item.id });
                        } else {
                          setSearchParams({ type, taskid: item.id });
                        }
                      }}
                      key={item.id}
                      className="flex h-8 w-full cursor-pointer items-center text-gray-700 dark:text-gray-300"
                    >
                      # {item.title}
                    </div>
                  ))
                ) : (
                  <div>목록이 존재하지 않습니다.</div>
                )
              ) : (
                skeletonRandomKey.map((s) => (
                  <Skeleton key={s} className="h-6 w-full" />
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
