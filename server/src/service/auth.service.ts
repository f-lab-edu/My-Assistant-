import { db } from '@/db';
import { NotAuthorizedError } from '@/middleware/error-handler';
import { winstonLogger } from '@/utils/logger';
import { Logger } from 'winston';

const log: Logger = winstonLogger('authService', 'debug');

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    log.error(error);
  }
};
export const getUserById = async (userId: string) => {
  try {
    if (!userId) {
      throw new NotAuthorizedError(
        '유효하지 않은 유저입니다.',
        'getUserById() method error',
      );
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    log.error(error);
  }
};

export const getUserByToken = async (token: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        emailVerificationToken: token,
      },
    });
    return user;
  } catch (error) {
    log.error(error);
  }
};
