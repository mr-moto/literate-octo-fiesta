import { router, publicProcedure } from '@/server/trpc';

export const usersRouter = router({
  getAll: publicProcedure.query(() => {}),
});
