import { appRouter } from '@/server';
import { TUser } from '@/types/user';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('test getAll user rpc', () => {
  const caller = appRouter.createCaller({});

  test('should return an array of users', async () => {
    const result = await caller.users.getAll();

    expectTypeOf(result).toEqualTypeOf<TUser[]>;
  });
});
