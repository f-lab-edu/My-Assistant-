import { db } from '@/db';
import { BadRequestError } from '@/middleware/error-handler';
import { Subtask } from '@prisma/client';

const createTags = async (tags: string[]) => {
  try {
    const tagInstances = await Promise.all(
      tags.map(async (tag) => {
        const existingTag = await db.tag.findUnique({
          where: { name: tag },
        });
        if (existingTag) {
          return existingTag;
        } else {
          return await db.tag.create({
            data: { name: tag },
          });
        }
      }),
    );
    return tagInstances;
  } catch (error) {
    console.error('태그 생성 중 오류 발생: ', error);
    throw new BadRequestError(
      '태그 생성 과정에서 오류가 발생했습니다.',
      'createTags() method error',
    );
  }
};

const createSubtasks = async (subtasks: Subtask[], taskId: string) => {
  try {
    const subtaskInstances = await Promise.all(
      subtasks.map((subtask) =>
        db.subtask.create({
          data: {
            title: subtask.title,
            completed: subtask.completed || false,
            taskId: taskId,
          },
        }),
      ),
    );
    return subtaskInstances;
  } catch (error) {
    console.error('서브태스크 생성 중 오류 발생: ', error);
    throw new BadRequestError(
      '서브태스크 생성 과정에서 오류가 발생했습니다.',
      'createSubtasks() method error',
    );
  }
};

export { createTags, createSubtasks };
