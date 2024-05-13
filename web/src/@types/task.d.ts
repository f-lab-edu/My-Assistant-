type ITaskStatusType = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
type ITaskPriorityType = 'LOW' | 'MEDIUM' | 'HIGH';

type ITaskState = {
  com: ITaskStatusType;
  not: ITaskStatusType;
  pro: ITaskStatusType;
  low: ITaskPriorityType;
  med: ITaskPriorityType;
  high: ITaskPriorityType;
};

type ICreateTaskType = {
  title: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  status: ITaskStatusType;
  priority: ITaskPriorityType;
  progress?: number;
};

type ITaskType = {
  createdAt: string;
  description: string;
  endDate: string;
  id: string;
  priority: ITaskPriorityType;
  progress: number;
  startDate: string;
  status: ITaskStatusType;
  title: string;
  updatedAt: string;
  userId: string;
  tags: string[];
};
