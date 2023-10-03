import { auth } from '@clerk/nextjs';
import { Clerk } from '@clerk/backend';
import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server';

export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = auth();
  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
