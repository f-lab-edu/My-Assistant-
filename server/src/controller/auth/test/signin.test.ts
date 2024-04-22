import { Request } from 'express';
import { authMockResponse } from './mocks/auth.mock';
import { getUserByEmail } from '@/service/auth.service';
import { comparePassword, signToken } from '@/db/auth.method';
import { signin } from '../signin.controller';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/service/auth.service', () => ({
  getUserByEmail: jest.fn(),
}));
jest.mock('@/db/auth.method', () => ({
  comparePassword: jest.fn(),
  signToken: jest.fn(),
}));

const EMAIL = 'test@example.com';
const PASSWORD = 'test123';
const USERNAME = 'testuser';
const USER_ID = '1';

describe('Signin Controller', () => {
  it('should fail signin when request body is invalid', async () => {
    const req: Request = {
      body: {},
    } as unknown as Request;
    const res = authMockResponse();

    await signin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: '"email" is required',
      comingFrom: 'signin() method error',
    });
  });

  it('should fail signin if the user does not exist', async () => {
    const req: Request = {
      body: {
        email: EMAIL,
        password: PASSWORD,
      },
    } as unknown as Request;
    const res = authMockResponse();

    (getUserByEmail as jest.Mock).mockResolvedValue(null);

    await signin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: '해당 이메일로 가입된 정보가 존재하지 않습니다.',
      comingFrom: 'signin() method error',
    });
  });

  it('should fail signin if the password does not match', async () => {
    const req: Request = {
      body: {
        email: EMAIL,
        password: PASSWORD,
      },
    } as unknown as Request;
    const res = authMockResponse();

    (getUserByEmail as jest.Mock).mockResolvedValue({
      id: USER_ID,
      email: EMAIL,
      username: USERNAME,
      password: 'wrongpassword',
    });
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await signin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: '비밀번호가 일치하지 않습니다.',
      comingFrom: 'signin() method error',
    });
  });

  it('should successfully signin and return a user and token', async () => {
    const req: Request = {
      body: {
        email: EMAIL,
        password: PASSWORD,
      },
    } as unknown as Request;
    const res = authMockResponse();

    (getUserByEmail as jest.Mock).mockResolvedValue({
      id: USER_ID,
      email: EMAIL,
      username: USERNAME,
      password: PASSWORD,
    });
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (signToken as jest.Mock).mockResolvedValue('aGeneratedToken');

    await signin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: '로그인에 성공하였습니다.',
      user: {
        username: USERNAME,
        email: EMAIL,
      },
      token: 'aGeneratedToken',
    });
  });
});
