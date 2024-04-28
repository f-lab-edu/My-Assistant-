import { db } from '@/db';
import { BadRequestError } from '@/middleware/error-handler';
import { getUserByEmail, getUserByToken } from '@/service/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const { token, isTestUser, email } = req.body;

    let user;
    if (!isTestUser) {
      user = await getUserByToken(token);
      if (!user) {
        throw new BadRequestError(
          '유효하지 않은 토큰입니다.',
          'verifyToken() method error',
        );
      }
      await db.user.update({
        where: {
          id: user.id,
          email: user.email,
          emailVerificationToken: token,
        },
        data: {
          emailVerificationToken: '',
          emailVerified: true,
        },
      });
    } else {
      user = await getUserByEmail(email);
      if (!user) {
        throw new BadRequestError(
          '해당 이메일로 가입된 정보가 존재하지 않습니다.',
          'verifyToken() method error',
        );
      }
      await db.user.update({
        where: {
          id: user.id,
          email: user.email,
          emailVerificationToken: user.email,
        },
        data: {
          emailVerificationToken: '',
          emailVerified: true,
        },
      });
    }

    res.status(StatusCodes.OK).json({
      message: '이메일 인증에 성공하였습니다.',
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'verifyToken() method error',
      });
  }
};
