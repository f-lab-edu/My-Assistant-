import crypto from 'crypto';
import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { signupSchema } from '@/db/auth.schema';
import { BadRequestError } from '@/middleware/error-handler';
import { getUserByEmail } from '@/service/auth.service';
import { uploads } from '@/utils/cloudinary-upload';
import { hashPassword, sendVerificationEmail } from '@/db/auth.method';
import { db } from '@/db';
import { StatusCodes } from 'http-status-codes';

export const signup = async (req: Request, res: Response) => {
  try {
    const { error } = await Promise.resolve(signupSchema.validate(req.body));
    if (error && error.details) {
      throw new BadRequestError(
        error.details[0].message,
        'signup() method error',
      );
    }

    const { username, email, password, profileImage, isTestUser } = req.body;
    const exsitingUser = await getUserByEmail(email);

    if (exsitingUser) {
      throw new BadRequestError(
        '해당 이메일로 가입된 정보가 이미 존재합니다.',
        'signup() method error',
      );
    }

    const profilePublicId = uuidV4();
    const uploadRes = await uploads(
      profileImage,
      `${profilePublicId}`,
      true,
      true,
    );

    if (!uploadRes || (uploadRes && !uploadRes.public_id)) {
      throw new BadRequestError(
        '파일 업로드에 실패하였습니다.',
        'signup() method error',
      );
    }

    const randomBytes = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters = randomBytes.toString('hex');

    const hashedPassword = await hashPassword(password);

    const userData = {
      username,
      email,
      password: hashedPassword,
      profilePublicId,
      profileImage: uploadRes?.secure_url,
      emailVerificationToken: isTestUser ? email : randomCharacters,
    };

    const user = await db.user.create({
      data: userData,
    });

    if (!isTestUser && user.emailVerificationToken) {
      await sendVerificationEmail(user.email, user.emailVerificationToken);
    }

    res.status(StatusCodes.CREATED).json({
      message: '회원가입에 성공하였습니다. 이메일을 확인해주세요.',
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message || 'Internal server error',
        comingFrom: 'signup() method error',
      });
  }
};
