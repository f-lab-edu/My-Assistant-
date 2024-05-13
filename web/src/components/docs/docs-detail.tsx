import { getTask } from '@/services/task.service';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { DocsForm } from './docs-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema } from '@/lib/schemas/task.schema';
import * as z from 'zod';
import { useEffect } from 'react';

export function DocsDetail() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const taskId = searchParams.get('taskid');

  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => await getTask(taskId!),
    enabled: !!taskId,
    select: (data) => data.task,
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

  useEffect(() => {
    if (task) {
      form.setValue('title', task.title);
      form.setValue('description', task.description);
      form.setValue('priority', task.priority);
      form.setValue('status', task.status);
      form.setValue('tags', task.tags);
    }
  }, [task]);

  return (
    <div className="h-full w-full">
      {task ? <DocsForm form={form} /> : null}
    </div>
  );
}
