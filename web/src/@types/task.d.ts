type ITaskStatusType = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
type ITaskPriorityType = 'LOW' | 'MEDIUM' | 'HIGH';

type ICreateTaskType = {
  title: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  status: ITaskStatusType;
  priority: ITaskPriorityType;
  progress?: number;
};
