import { start } from '@/server';
import express from 'express';

const initialize = () => {
  const app = express();
  start(app);
};

initialize();
