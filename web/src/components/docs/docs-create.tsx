import { useModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Expand, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createTaskSchema } from '@/lib/schemas/task.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DocsCreateDetails } from './docs-create-details';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { DocsCreateTags } from './docs-create-tags';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '@/services/task.service';

export function DocsCreate() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { type, isOpen, onClose } = useModal();
  const isDocsCreateModalOpen = type === 'createTask' && isOpen;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { mutateAsync: createTaskFn, isPending } = useMutation({
    mutationFn: async (data: ICreateTaskType) => await createTask(data),
  });

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      tags: [],
      status: 'NOT_STARTED',
      priority: 'MEDIUM',
    },
  });

  const submitHandler = (values: z.infer<typeof createTaskSchema>) => {
    try {
      createTaskFn(values);
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const closeHandler = () => {
    form.reset();
    onClose();
  };

  const expandedStyle = isExpanded
    ? 'fixed inset-0 items-start flex flex-col h-screen max-h-none w-screen max-w-none translate-x-0 translate-y-0'
    : 'sm:rounded-lg';

  return (
    <Dialog open={isDocsCreateModalOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'transition-transform  duration-300 ease-out',
          'transform',
          expandedStyle,
          { 'will-change': 'transform, width, height' },
        )}
      >
        <DialogHeader className="w-full border-b border-solid border-gray-300 pb-4 dark:border-gray-700">
          <div className="flex w-full items-center justify-between px-4">
            <h2>Docs Detail</h2>
            <div className="flex items-center gap-2.5">
              <Expand
                onClick={() => setIsExpanded((prevState) => !prevState)}
                className="h-4 w-4 cursor-pointer"
              />
              <X className="h-5 w-5 cursor-pointer" onClick={closeHandler} />
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className={cn(
              'flex',
              isExpanded
                ? 'w-[25rem] flex-1 flex-row border-r border-solid border-gray-300'
                : 'flex-col border-none',
            )}
          >
            <div className="flex w-full flex-col gap-2">
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="제목을 입력해주세요."
                          {...field}
                          className="border-none text-2xl font-bold outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="설명을 입력해주세요."
                          {...field}
                          ref={textareaRef}
                          onInput={handleInput}
                          className="resize-none border-none font-bold outline-none"
                          style={{ minHeight: '100px', overflowY: 'hidden' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DocsCreateDetails form={form} />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex items-center px-4">
                    <FormLabel className="flex-1 text-[0.875rem] text-gray-500">
                      시작 날짜
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild className="flex-1">
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'yyyy/MM/dd')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex items-center px-4">
                    <FormLabel className="flex-1 text-[0.875rem] text-gray-500">
                      종료 날짜
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild className="flex-1">
                        <FormControl>
                          <Button
                            disabled={form.getValues('startDate') == null}
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'yyyy/MM/dd')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            !form.getValues('startDate') ||
                            (form.getValues('startDate') &&
                              date < form.getValues('startDate')) ||
                            date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DocsCreateTags form={form} type="create" />
            </div>
            <Button
              variant="outline"
              size="lg"
              className="mt-6 font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading,,,
                </>
              ) : (
                '생성'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
