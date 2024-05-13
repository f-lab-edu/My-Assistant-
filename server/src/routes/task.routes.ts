import { createTask } from '@/controller/task/task-create.controller';
import { getTask, getTasksByUser } from '@/service/task.service';
import express from 'express';

const BASE_PATH = '/task';

const router = express.Router();

export const taskRoutes = () => {
  router.post(`${BASE_PATH}/create`, createTask);
  router.get(`${BASE_PATH}s`, getTasksByUser);
  router.get(`${BASE_PATH}/:id`, getTask);

  return router;
};
