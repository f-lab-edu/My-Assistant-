import { customAxios } from '@/lib/api';

export const signup = async (payload: ISignupType) => {
  const { data } = await customAxios.post('/auth/signup', payload);
  return data;
};

export const signin = async (payload: ISigninType) => {
  const { data } = await customAxios.post('/auth/signin', payload);
  return data;
};

export const verifyToken = async (payload: IVerfiyTokenType) => {
  const { data } = await customAxios.post('/auth/token', payload);
  return data;
};
