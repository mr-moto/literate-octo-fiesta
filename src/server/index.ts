import { router } from './trpc';
import { usersRouter } from './routes/users';
import { userRouter } from './routes/user';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const appRouter = router({
  users: usersRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
