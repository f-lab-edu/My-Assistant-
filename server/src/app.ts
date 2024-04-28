import { start } from '@/server';
import express from 'express';
import { config } from './config';

const initialize = () => {
  config.cloudinaryConfig();
  const app = express();
  start(app);
};

initialize();
