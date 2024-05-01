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
  dueDate: Joi.date().optional().messages({
    'date.base': 'Due Date must be a valid date',
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
  progress: Joi.number().integer().min(0).max(100).required().messages({
    'number.base': 'Progress must be of type integer',
    'number.min': 'Progress는 0 이상이어야합니다.',
    'number.max': 'Progress는 100 이하여야합니다.',
  }),
});
