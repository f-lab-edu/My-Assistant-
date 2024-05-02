import * as z from 'zod';

export const docsSearchSchema = z.object({
  search: z
    .string()
    .min(1, { message: '최소 1자 이상을 입력해주세요.' })
    .max(20, { message: '검색은 20자 이하여야합니다.' }),
});
