import { db } from '@/db';
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
