import { createTask } from '@/controller/task/task-create.controller';
import express from 'express';

const BASE_PATH = '/task';

const router = express.Router();

export const taskRoutes = () => {
  router.post(`${BASE_PATH}/create`, createTask);

  return router;
};
