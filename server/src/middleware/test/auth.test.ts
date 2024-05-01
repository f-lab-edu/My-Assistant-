import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authMiddleware } from '../auth.middleware';
import { verify } from 'jsonwebtoken';
import { db } from '@/db';
import { authMockResponse } from '@/controller/auth/test/mocks/auth.mock';
import { signToken } from '@/db/auth.method';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));
jest.mock('@/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));
jest.mock('@/db/auth.method', () => ({
  signToken: jest.fn(),
}));

const USER_ID = 'user-123';
const EMAIL = 'test@example.com';
const USERNAME = 'testuser';
const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if access token is missing', async () => {
    const req = { cookies: {} } as unknown as Request;
    const res = authMockResponse();
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      message: 'access token이 유효하지 않습니다.',
      comingFrom: 'authMiddleware() method error',
    });
  });

  it('should handle invalid access token', async () => {
    const req = {
      cookies: { accessToken: ACCESS_TOKEN },
    } as unknown as Request;
    const res = authMockResponse();
    const next = jest.fn();

    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      message: '유효하지 않은 토큰입니다.',
      comingFrom: 'authMiddleware() method error',
    });
  });

  it('should refresh tokens if access token is expired and refresh token is valid', async () => {
    const req = {
      cookies: { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN },
    } as unknown as Request;
    const res = authMockResponse();
    const next = jest.fn();

    (verify as jest.Mock)
      .mockImplementationOnce(() => {
        throw new Error('Expired token');
      })
      .mockImplementationOnce(() => ({ id: USER_ID }));

    (db.user.findUnique as jest.Mock).mockResolvedValue({
      id: USER_ID,
      email: EMAIL,
      username: USERNAME,
    });

    (signToken as jest.Mock).mockResolvedValue({
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });

    await authMiddleware(req, res, next);
    expect(verify).toHaveBeenCalledTimes(2);
    expect(db.user.findUnique).toHaveBeenCalledTimes(1);
    expect(signToken).toHaveBeenCalledTimes(1);

    expect(res.cookie).toHaveBeenCalledWith(
      'accessToken',
      'new-access-token',
      expect.anything(),
    );

    expect(next).toHaveBeenCalled();
    if (!next.mock.calls.length) {
      console.error('Next was not called. Check error handling and flow.');
    }
  });

  it('should fail if both tokens are invalid', async () => {
    const req = {
      cookies: { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN },
    } as unknown as Request;
    const res = authMockResponse();
    const next = jest.fn();

    (verify as jest.Mock)
      .mockImplementationOnce(() => {
        throw new Error('Invalid access token');
      })
      .mockImplementationOnce(() => {
        throw new Error('Invalid refresh token');
      });

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      message: 'refresh token이 유효하지 않습니다.',
      comingFrom: 'authMiddleware() method error',
    });
  });
});
