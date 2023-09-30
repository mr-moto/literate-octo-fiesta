import { router, publicProcedure } from '@/server/trpc';
import { z } from 'zod';

export const userRouter = router({
  create: publicProcedure.input({}).mutation(() => {}),
  update: publicProcedure.input({}).mutation(() => {}),
});
