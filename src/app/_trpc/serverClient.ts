import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server';
import { auth } from '@clerk/nextjs/server';

export const serverClient = appRouter.createCaller({ session: auth() });
