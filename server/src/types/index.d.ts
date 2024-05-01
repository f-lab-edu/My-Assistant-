import { Request as ExpressRequest } from 'express';

type UserPayloadType = {
  id: string;
  email: string;
  username: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserPayloadType;
    }
  }
}
