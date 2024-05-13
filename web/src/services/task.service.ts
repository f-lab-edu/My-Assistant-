import { customAxios } from '@/lib/api';

export const createTask = async (payload: ICreateTaskType) => {
  const { data } = await customAxios.post('/task/create', payload);
  return data;
};

export const getTasks = async () => {
  const { data } = await customAxios.get('/tasks');
  return data;
};

export const getTask = async (taskId: string) => {
  const { data } = await customAxios.get(`/task/${taskId}`);
  return data;
};
