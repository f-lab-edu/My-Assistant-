import { db } from '@/db';
import { winstonLogger } from '@/utils/logger';
import { Logger } from 'winston';
import { getUserById } from './auth.service';
import { Request, Response } from 'express';
import {
  BadRequestError,
  NotAuthorizedError,
} from '@/middleware/error-handler';
import { StatusCodes } from 'http-status-codes';

const log: Logger = winstonLogger('taskService', 'debug');

export const getTasksByUser = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      throw new NotAuthorizedError(
        '유효하지 않은 유저입니다.',
        'getTasksByUser() method error',
      );
    }
    const user = await getUserById(req.user.id);
    if (!user) {
      throw new NotAuthorizedError(
        '유효하지 않은 유저입니다.',
        'getTasksByUser() method error',
      );
    }

    const tasks = await db.task.findMany({
      where: {
        userId: user.id,
      },
    });

    res.status(StatusCodes.OK).json({
      message: `${user.username}님의 Task를 불러오는데 성공하였습니다.`,
      tasks,
    });
  } catch (error: any) {
    log.error(error);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'getTasksByUser() method error',
      });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      throw new NotAuthorizedError(
        '유효하지 않은 유저입니다.',
        'getTask() method error',
      );
    }
    const user = await getUserById(req.user.id);
    if (!user) {
      throw new NotAuthorizedError(
        '유효하지 않은 유저입니다.',
        'getTask() method error',
      );
    }

    if (!req.params.id) {
      throw new BadRequestError(
        '유효하지 않은 Task입니다.',
        'getTask() method error',
      );
    }
    const task = await db.task.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!task) {
      throw new BadRequestError(
        'Task를 정상적으로 불러오지 못하였습니다. 다시 시도해주세요.',
        'getTask() method error',
      );
    }

    res.status(StatusCodes.OK).json({
      message: `${task.title}를 불러오는데 성공하였습니다.`,
      task,
    });
  } catch (error: any) {
    log.error(error);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'getTask() method error',
      });
  }
};
