import { type AppRouter, appRouter } from '@/server';
import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import App from 'next/app';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('test add function', () => {
  const caller = appRouter.createCaller({});

  test.each([11, 12, 13])('should return obj', async (id) => {
    type Input = inferProcedureInput<AppRouter['user']['create']>;

    const input: Input = {
      name: 'namename',
      email: 'email@email.com',
      website: 'website.com',
      phone: '1234567899',
      extension: '12345',
      companyName: 'companyName',
    };

    const result = await caller.user.create(input);

    expect(result.name).toBe('namename');
    expect(result.email).toBe('email@email.com');
    expect(result.website).toBe('website.com');
    expect(result.phone).toBe('1234567899 x12345');
    expect(result.company.name).toBe('companyName');
    expect(result.id).toBe(id);
  });
});
