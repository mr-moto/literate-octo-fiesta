import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { Context } from './context';
import { auth } from '@clerk/nextjs/server';

const t = initTRPC.create({
  transformer: SuperJSON,
});
// const t = initTRPC.context<Context>().create({
//   transformer: SuperJSON,
// });

const isAuthed = t.middleware(async ({ next, ctx }) => {
  const session = auth();
  if (!session.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      userId: session.userId,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
