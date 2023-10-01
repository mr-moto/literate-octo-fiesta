import { userSchema } from '@/server/routes/user';
import { z } from 'zod';

export type TUser = z.infer<typeof userSchema>;
