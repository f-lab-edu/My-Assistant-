import { db } from '@/db';
import { taskSchema } from '@/db/task.schema';
import { BadRequestError } from '@/middleware/error-handler';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createSubtasks, createTags } from './tag-subtask.controller';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { error } = await Promise.resolve(taskSchema.validate(req.body));
    if (error && error.details) {
      throw new BadRequestError(
        error.details[0].message,
        'createTask() method error',
      );
    }

    const {
      title,
      description,
      startDate,
      endDate,
      status,
      priority,
      progress,
      tags,
      subtasks,
    } = req.body;

    if (!Object.values(TaskStatus).includes(status)) {
      throw new BadRequestError(
        '유효하지 않은 상태 값입니다.',
        'createTask() method error',
      );
    }
    if (!Object.values(TaskPriority).includes(priority)) {
      throw new BadRequestError(
        '유효하지 않은 우선순위 값입니다.',
        'createTask() method error',
      );
    }
    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestError(
        '마감일은 시작 날짜보다 미래여야 합니다.',
        'createTask() method error',
      );
    }

    if (!req.user || (req.user && !req.user.id)) {
      throw new BadRequestError(
        '로그인 후 해당 서비스를 이용하실 수 있습니다.',
        'createTask() method error',
      );
    }

    const tagInstances = await createTags(tags);

    const newTask = await db.task.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        status,
        priority,
        progress,
        userId: req.user.id,
        tags: {
          connect: tagInstances.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
        subtasks: true,
      },
    });

    if (subtasks && subtasks.length) {
      const subtaskInstances = await createSubtasks(subtasks, newTask.id);
      newTask.subtasks = subtaskInstances;
    }

    if (!newTask) {
      throw new BadRequestError(
        '태스크 생성에 실패했습니다.',
        'createTask() method error',
      );
    }

    return res.status(StatusCodes.CREATED).json({
      message: 'Task가 생성되었습니다.',
      task: newTask,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'createTask() method error',
      });
  }
};
