import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { docsSearchSchema } from '@/lib/schemas/search.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Folder, Loader2, Plus, Search, Star, Timer } from 'lucide-react';
import { Button } from '../ui/button';
import DocsList from './docs-list';
import { useModal } from '@/hooks/useModal';

export default function DocsSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof docsSearchSchema>>({
    resolver: zodResolver(docsSearchSchema),
    defaultValues: {
      search: '',
    },
  });

  const submitHandler = (values: z.infer<typeof docsSearchSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    if (!type) {
      setSearchParams({ type: 'project' });
    }
  }, [searchParams, type]);

  return (
    <div className="flex h-full w-full flex-col justify-between px-4">
      <div className="flex h-full w-full flex-col">
        <h2 className="text-lg font-semibold">All Docs</h2>
        <Tabs
          defaultValue={type || 'project'}
          onValueChange={(e) => setSearchParams({ type: e })}
          className="py-4"
        >
          <TabsList className="bg-transparent transition-all duration-200">
            <TabsTrigger
              value="project"
              className={cn('bg-transparent text-[1rem] font-semibold', {
                'active-tab': type === 'project',
              })}
            >
              Project
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className={cn(
                'tabs-trigger dark:tabs-trigger bg-transparent text-[1rem] font-semibold',
                {
                  'active-tab': type === 'schedule',
                },
              )}
            >
              Schedule
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form
              className="mb-4 mt-6 w-full"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="relative flex h-8 items-center rounded-md border border-solid border-gray-800 pr-1.5 dark:border-gray-200">
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        type="text"
                        {...field}
                        className="h-full w-[calc(100%-1.5rem)] border-none bg-transparent"
                      />
                    </FormControl>
                    <Button
                      disabled={form.formState.isSubmitting}
                      variant="ghost"
                      className="!m-0 flex h-full w-8 items-center justify-center border-none bg-transparent p-0 hover:bg-transparent"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="!m-0 h-full w-5 animate-spin" />
                      ) : (
                        <Search className="!m-0 h-full w-5" />
                      )}
                    </Button>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DocsList
            id="recent"
            title="최신 문서"
            icon={<Timer className="h-5 w-5" />}
          />
          <DocsList
            id="best"
            title="많이 본 문서"
            icon={<Folder className="h-5 w-5" />}
          />
          <DocsList
            id="best"
            title="중요 문서"
            icon={<Star className="h-5 w-5" />}
          />
        </Tabs>
      </div>
      <div
        onClick={() => onOpen('createTask')}
        className="border-t border-solid border-gray-300 pt-4 dark:border-gray-700"
      >
        <Button
          variant="outline"
          size="lg"
          className="relative flex w-full items-center justify-center gap-4"
        >
          <Plus className="absolute left-4 h-5 w-5" /> 문서 생성
        </Button>
      </div>
    </div>
  );
}
