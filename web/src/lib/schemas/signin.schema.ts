import * as z from 'zod';

export const signinSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 최소 4자리 이상이어야 합니다.' })
    .max(12, { message: '비밀번호는 12자리 이하여야 합니다.' }),
});
