import { router } from './trpc';
import { usersRouter } from './routes/users';
import { userRouter } from './routes/user';

export const appRouter = router({
  users: usersRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
