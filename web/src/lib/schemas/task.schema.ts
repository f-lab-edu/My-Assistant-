import * as z from 'zod';

const TaskStatusType = z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']);
const TaskPriorityType = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(50, { message: 'Title은 50자 이하여야합니다.' }),
  description: z
    .string()
    .max(500, { message: 'Description은 500자 이하여야합니다.' }),
  startDate: z.date({
    required_error: '날짜를 지정해주세요.',
  }),
  endDate: z.date({
    required_error: '날짜를 지정해주세요.',
  }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
  status: TaskStatusType,
  priority: TaskPriorityType,
});
