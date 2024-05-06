import Joi, { ObjectSchema } from 'joi';

export const taskSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().min(1).max(20).required().messages({
    'string.base': 'Title must be of type string',
    'string.min': 'Title은 1자 이상이어야합니다.',
    'string.max': 'Title은 20자 이하여야합니다.',
    'string.empty': 'Title는 필수 입력값입니다.',
  }),
  description: Joi.string().max(300).optional().messages({
    'string.base': 'Description must be of type string',
    'string.max': 'Description은 300자 이하여야합니다.',
  }),
  startDate: Joi.date().optional().messages({
    'date.base': 'startDate must be a valid date',
  }),
  endDate: Joi.date().optional().messages({
    'date.base': 'endDate must be a valid date',
  }),
  status: Joi.string()
    .valid('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED')
    .required()
    .messages({
      'string.base': 'Status must be of type string',
      'any.only':
        'Status는 NOT_STARTED, IN_PROGRESS, COMPLETED 중 하나이어야합니다.',
    }),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required().messages({
    'string.base': 'Priority must be of type string',
    'any.only': 'Priority는 LOW, MEDIUM, HIGH 중 하나이어야합니다.',
  }),
  progress: Joi.number().integer().min(0).max(100).optional().messages({
    'number.base': 'Progress must be of type integer',
    'number.min': 'Progress는 0 이상이어야합니다.',
    'number.max': 'Progress는 100 이하여야합니다.',
  }),
  tags: Joi.array()
    .items(
      Joi.string().min(1).max(15).messages({
        'string.base': '각 태그는 문자열이어야 합니다.',
        'string.empty': '태그는 비어 있을 수 없습니다.',
        'string.min': '태그는 최소 1자 이상이어야 합니다.',
        'string.max': '태그는 최대 15자 이하여야 합니다.',
      }),
    )
    .min(1)
    .max(3)
    .messages({
      'array.base': '태그는 배열이어야 합니다.',
      'array.min': '태그는 최소 1개 이상이어야 합니다.',
      'array.max': '태그는 최대 3개까지만 허용됩니다.',
    }),
});
