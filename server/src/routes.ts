import { Application } from 'express';
import { authRoutes } from './routes/auth.routes';
import { authMiddleware } from './middleware/auth.middleware';
import { taskRoutes } from './routes/task.routes';

const BASE_PATH = '/api/v1';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, authRoutes());
  app.use(BASE_PATH, authMiddleware, taskRoutes());
};
