import { signin } from '@/controller/auth/signin.controller';
import { signup } from '@/controller/auth/signup.controller';
import { verifyToken } from '@/controller/auth/verifyToken.controller';
import express from 'express';

const BASE_PATH = '/auth';

const router = express.Router();

export const authRoutes = () => {
  router.post(`${BASE_PATH}/signup`, signup);
  router.post(`${BASE_PATH}/signin`, signin);
  router.post(`${BASE_PATH}/token`, verifyToken);

  return router;
};
