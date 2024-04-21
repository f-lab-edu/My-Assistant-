import { Response } from 'express';

type AuthMockBody = {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  isTestUser: boolean;
};

type AuthMockJWT = {
  jwt?: string;
};

export const authMockRequest = (
  session: AuthMockJWT,
  body: AuthMockBody,
  params?: unknown,
) => ({
  session,
  body,
  params,
});

export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
