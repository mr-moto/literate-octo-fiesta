import { auth } from '@clerk/nextjs/server';
import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext(opts?: CreateNextContextOptions) {
  const session = auth();

  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
