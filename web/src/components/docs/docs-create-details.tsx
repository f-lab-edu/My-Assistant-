import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { createTaskSchema } from '@/lib/schemas/task.schema';
import { taskState } from '@/constants/task-content';

export function DocsCreateDetails({
  form,
}: {
  form: UseFormReturn<z.infer<typeof createTaskSchema>>;
}) {
  const getStatusLabel = (status: ITaskStatusType) => {
    switch (status) {
      case taskState.not:
        return '시작전';
      case taskState.pro:
        return '진행중';
      case taskState.com:
        return '완료';
      default:
        return '알 수 없음';
    }
  };
  const getPriorityLabel = (priority: ITaskPriorityType) => {
    switch (priority) {
      case taskState.low:
        return '낮음';
      case taskState.med:
        return '보통';
      case taskState.high:
        return '높음';
      default:
        return '알 수 없음';
    }
  };

  const badgeClassName = (value: ITaskStatusType) => {
    if (value === 'NOT_STARTED') {
      return 'bg-black hover:bg-black dark:bg-white dark:hover:bg-white';
    }
    if (value === 'IN_PROGRESS') {
      return 'bg-yellow-300 text-black hover:bg-yellow-300';
    }
    if (value === 'COMPLETED') {
      return 'bg-green-500 hover:bg-green-500';
    }
    return '';
  };

  return (
    <div className="flex w-full flex-col px-4">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel className="flex-1 text-[0.875rem] text-gray-500">
                상태
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <>
                    <SelectTrigger
                      className="flex-1 border-none outline-none"
                      type="submit"
                    >
                      <Badge className={badgeClassName(field.value)}>
                        {getStatusLabel(field.value)}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="NOT_STARTED"
                        className="flex w-full cursor-pointer justify-start hover:!bg-transparent"
                      >
                        <Badge className="bg-black hover:bg-black dark:bg-white dark:hover:bg-white">
                          시작전
                        </Badge>
                      </SelectItem>
                      <SelectItem
                        value="IN_PROGRESS"
                        className="flex w-full cursor-pointer justify-start hover:!bg-transparent"
                      >
                        <Badge className="bg-yellow-300 text-black hover:bg-yellow-300 hover:text-black">
                          진행중
                        </Badge>
                      </SelectItem>
                      <SelectItem
                        value="COMPLETED"
                        className="flex w-full cursor-pointer justify-start hover:!bg-transparent"
                      >
                        <Badge className="bg-green-500 hover:bg-green-500">
                          완료
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </>
                </FormControl>
              </Select>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel className="flex-1 text-[0.875rem] text-gray-500">
                중요도
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <>
                    <SelectTrigger
                      className="flex-1 border-none outline-none"
                      type="submit"
                    >
                      <Badge
                        className={cn(
                          field.value === 'LOW' &&
                            'bg-gray-400 hover:bg-gray-400',
                          field.value === 'MEDIUM' &&
                            'bg-black hover:bg-black dark:bg-white dark:hover:bg-white',
                          field.value === 'HIGH' &&
                            'bg-red-500 hover:bg-red-500',
                        )}
                      >
                        {getPriorityLabel(field.value)}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="LOW"
                        className="flex w-full cursor-pointer justify-start hover:!bg-transparent"
                      >
                        <Badge className="bg-gray-400 hover:bg-gray-400">
                          낮음
                        </Badge>
                      </SelectItem>
                      <SelectItem
                        value="MEDIUM"
                        className="flex w-full cursor-pointer justify-start hover:!bg-transparent"
                      >
                        <Badge className="bg-black hover:bg-black dark:bg-white dark:hover:bg-white">
                          보통
                        </Badge>
                      </SelectItem>
                      <SelectItem
                        value="HIGH"
                        className="flex w-full cursor-pointer justify-start hover:!bg-transparent"
                      >
                        <Badge className="bg-red-500 hover:bg-red-500">
                          높음
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </>
                </FormControl>
              </Select>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
