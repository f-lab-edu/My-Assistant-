import { comparePassword, signToken } from '@/db/auth.method';
import { signinSchema } from '@/db/auth.schema';
import { BadRequestError } from '@/middleware/error-handler';
import { getUserByEmail } from '@/service/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const signin = async (req: Request, res: Response) => {
  try {
    const { error } = await Promise.resolve(signinSchema.validate(req.body));
    if (error && error.details) {
      throw new BadRequestError(
        error.details[0].message,
        'signin() method error',
      );
    }

    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      throw new BadRequestError(
        '해당 이메일로 가입된 정보가 존재하지 않습니다.',
        'signin() method error',
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestError(
        '비밀번호가 일치하지 않습니다.',
        'signin() method error',
      );
    }

    const userJWT = await signToken(user.id, user.email, user.username);
    res.status(StatusCodes.OK).json({
      message: '로그인에 성공하였습니다.',
      user: {
        username: user.username,
        email: user.email,
      },
      token: userJWT,
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'signin() method error',
      });
  }
};
