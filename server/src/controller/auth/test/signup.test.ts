import { Request } from 'express';
import { authMockResponse } from './mocks/auth.mock';
import { getUserByEmail } from '@/service/auth.service';
import {
  hashPassword,
  sendVerificationEmail,
  signToken,
} from '@/db/auth.method';
import { db } from '@/db';
import { StatusCodes } from 'http-status-codes';
import { signup } from '../signup.controller';
import { uploads } from '@/utils/cloudinary-upload';

jest.mock('@/service/auth.service', () => ({
  getUserByEmail: jest.fn(),
}));
jest.mock('@/db', () => ({
  db: {
    user: {
      create: jest.fn(),
    },
  },
}));
jest.mock('@/db/auth.method', () => ({
  hashPassword: jest.fn(),
  sendVerificationEmail: jest.fn(),
  signToken: jest.fn(),
}));
jest.mock('@/utils/cloudinary-upload', () => ({
  uploads: jest.fn(),
}));

const USERNAME = 'test01';
const EMAIL = 'test01@test.com';
const PASSWORD = '123456';

describe('Signup Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Signup Controller', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return signup a new user and send a verification email', async () => {
      const req: Request = {
        body: {
          username: USERNAME,
          email: EMAIL,
          password: PASSWORD,
          profileImage: 'test-img!!!!',
          isTestUser: true,
        },
      } as unknown as Request;
      const res = authMockResponse();

      (getUserByEmail as jest.Mock).mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue(PASSWORD);
      (db.user.create as jest.Mock).mockResolvedValue({
        id: '1',
        username: USERNAME,
        email: EMAIL,
        password: PASSWORD,
        profilePublicId: 'public-id',
        profileImage: 'secure-url',
        emailVerificationToken: 'token',
      });
      (sendVerificationEmail as jest.Mock).mockResolvedValue(true);
      (signToken as jest.Mock).mockResolvedValue('jwtToken');

      (uploads as jest.Mock).mockResolvedValue({
        public_id: 'default-public-id',
        secure_url: `https://fakeurl.com/default.jpg`,
      });
      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: '회원가입에 성공하였습니다. 이메일을 확인해주세요.',
        user: {
          username: USERNAME,
          email: EMAIL,
        },
        token: 'jwtToken',
      });
    });

    it('should fail to signup if the email already exists', async () => {
      const req: Request = {
        body: {
          username: USERNAME,
          email: EMAIL,
          password: PASSWORD,
          profileImage: 'test-img',
          isTestUser: true,
        },
      } as unknown as Request;
      const res = authMockResponse();

      (getUserByEmail as jest.Mock).mockResolvedValue({
        id: '2!!!!',
        username: USERNAME,
        email: EMAIL,
      });
      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: '해당 이메일로 가입된 정보가 이미 존재합니다.',
        comingFrom: 'signup() method error',
      });
    });

    it('should fail to signup if the request data is invalid', async () => {
      const req: Request = {
        body: {},
      } as unknown as Request;
      const res = authMockResponse();

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: '"username" is required',
        comingFrom: 'signup() method error',
      });
    });

    it('should fail to signup if the file upload fails', async () => {
      const req: Request = {
        body: {
          username: USERNAME,
          email: EMAIL,
          password: PASSWORD,
          profileImage: 'fail-img',
          isTestUser: true,
        },
      } as unknown as Request;
      const res = authMockResponse();

      (uploads as jest.Mock).mockRejectedValue(
        new Error('Failed to upload image'),
      );

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to upload image',
        comingFrom: 'signup() method error',
      });
    });
  });

  // it('should fail to signup if sending the verification email fails', async () => {
  //   const req: Request = {
  //     body: {
  //       username: USERNAME,
  //       email: EMAIL,
  //       password: PASSWORD,
  //       profileImage: 'test-img',
  //       isTestUser: false,
  //     },
  //   } as unknown as Request;
  //   const res = authMockResponse();

  //   (getUserByEmail as jest.Mock).mockResolvedValue(null);
  //   (hashPassword as jest.Mock).mockResolvedValue(PASSWORD);
  //   (db.user.create as jest.Mock).mockResolvedValue({
  //     id: '1',
  //     username: USERNAME,
  //     email: EMAIL,
  //     password: PASSWORD,
  //     profilePublicId: 'public-id',
  //     profileImage: 'secure-url',
  //     emailVerificationToken: 'token',
  //   });
  //   (sendVerificationEmail as jest.Mock).mockRejectedValue(
  //     new Error('Email sending failed'),
  //   );

  //   await signup(req, res);

  //   expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: 'Email sending failed',
  //   });
  // });
});
