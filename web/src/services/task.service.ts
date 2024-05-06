import { customAxios } from '@/lib/api';

export const createTask = async (payload: ICreateTaskType) => {
  const { data } = await customAxios.post('/task/create', payload);
  return data;
};
