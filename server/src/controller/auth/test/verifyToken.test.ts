import { Request } from 'express';
import { authMockResponse } from './mocks/auth.mock';
import { getUserByEmail, getUserByToken } from '@/service/auth.service';
import { db } from '@/db';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../verifyToken.controller';

jest.mock('@/service/auth.service', () => ({
  getUserByEmail: jest.fn(),
  getUserByToken: jest.fn(),
}));
jest.mock('@/db', () => ({
  db: {
    user: {
      update: jest.fn(),
    },
  },
}));

const EMAIL = 'test@example.com';
const TOKEN = 'valid-token-123';
const USER_ID = 'user123';

describe('VerifyToken Controller', () => {
  it('should verify the token successfully for a normal user', async () => {
    const req: Request = {
      body: {
        token: TOKEN,
        isTestUser: false,
        email: EMAIL,
      },
    } as unknown as Request;
    const res = authMockResponse();

    (getUserByToken as jest.Mock).mockResolvedValue({
      id: USER_ID,
      email: EMAIL,
      emailVerificationToken: TOKEN,
    });
    (db.user.update as jest.Mock).mockResolvedValue({
      emailVerified: true,
    });

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: '이메일 인증에 성공하였습니다.',
    });
  });

  it('should verify the token successfully for a test user', async () => {
    const req: Request = {
      body: {
        token: EMAIL,
        isTestUser: true,
        email: EMAIL,
      },
    } as unknown as Request;
    const res = authMockResponse();

    (getUserByEmail as jest.Mock).mockResolvedValue({
      id: USER_ID,
      email: EMAIL,
      emailVerificationToken: EMAIL,
    });
    (db.user.update as jest.Mock).mockResolvedValue({
      emailVerified: true,
    });

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: '이메일 인증에 성공하였습니다.',
    });
  });

  it('should fail to verify token if the user does not exist', async () => {
    const req: Request = {
      body: {
        token: TOKEN,
        isTestUser: false,
        email: EMAIL,
      },
    } as unknown as Request;
    const res = authMockResponse();

    (getUserByToken as jest.Mock).mockResolvedValue(null);

    await verifyToken(req, res);

    expect(getUserByToken).toHaveBeenCalledWith(TOKEN);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: '유효하지 않은 토큰입니다.',
      comingFrom: 'verifyToken() method error',
    });
  });
});
