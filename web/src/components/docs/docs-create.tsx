import { useModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Expand, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createTaskSchema } from '@/lib/schemas/task.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DocsForm } from './docs-form';

export function DocsCreate() {
  const { type, isOpen, onClose } = useModal();
  const isDocsCreateModalOpen = type === 'createTask' && isOpen;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  const closeHandler = () => {
    form.reset();
    onClose();
  };

  const expandedStyle = isExpanded
    ? 'fixed inset-0 items-start flex flex-col h-full md:h-screen max-h-none w-full md:w-screen max-w-none translate-x-0 translate-y-0'
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
        <DocsForm isExpanded={isExpanded} form={form} />
      </DialogContent>
    </Dialog>
  );
}
