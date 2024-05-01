import { config } from '@/config';
import { db } from '@/db';
import { signToken } from '@/db/auth.method';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { BadRequestError, NotAuthorizedError } from './error-handler';
import { UserPayloadType } from '@/types';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      throw new NotAuthorizedError(
        'access token이 유효하지 않습니다.',
        'authMiddleware() method error',
      );
    }

    try {
      const decoded = verify(
        accessToken,
        config.JWT_SECRET!,
      ) as UserPayloadType;
      req.user = decoded;
      return next();
    } catch (error) {
      if (refreshToken) {
        try {
          const decodedRefresh = verify(
            refreshToken,
            config.JWT_REFRESH_SECRET!,
          ) as UserPayloadType;
          const newTokens = await refreshTokens(decodedRefresh.id);
          res.cookie('accessToken', newTokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          });
          req.user = decodedRefresh;
          return next();
        } catch (refreshTokenError) {
          throw new NotAuthorizedError(
            'refresh token이 유효하지 않습니다.',
            'authMiddleware() method error',
          );
        }
      } else {
        throw new NotAuthorizedError(
          '유효하지 않은 토큰입니다.',
          'authMiddleware() method error',
        );
      }
    }
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'authMiddleware() method error',
      });
  }
};

async function refreshTokens(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new BadRequestError(
      '해당 아이디로 가입된 유저를 찾을 수 없습니다.',
      'authMiddleware() method error',
    );
  }
  const { accessToken, refreshToken } = await signToken(
    user.id,
    user.email,
    user.username,
  );
  return { accessToken, refreshToken };
}
