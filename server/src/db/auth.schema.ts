import Joi, { ObjectSchema } from 'joi';

export const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Username은 4자 이상이어야합니다.',
    'string.max': 'Username은 12자 이하여야합니다.',
    'string.empty': 'Username는 필수 입력값입니다.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': '유효하지 않은 이메일 형식입니다.',
    'string.empty': 'Email은 필수 입력값입니다.',
  }),
  password: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password은 4자 이상이어야합니다.',
    'string.max': 'Password은 12자 이하여야합니다.',
    'string.empty': 'Password는 필수 입력값입니다.',
  }),
  profileImage: Joi.string(),
  isTestUser: Joi.boolean(),
});

export const signinSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': '유효하지 않은 이메일 형식입니다.',
    'string.empty': 'Email은 필수 입력값입니다.',
  }),
  password: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password은 4자 이상이어야합니다.',
    'string.max': 'Password은 12자 이하여야합니다.',
    'string.empty': 'Password는 필수 입력값입니다.',
  }),
});
