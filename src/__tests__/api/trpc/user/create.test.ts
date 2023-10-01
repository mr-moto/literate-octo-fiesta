import { appRouter } from '@/server';
import { TUser } from '@/types/user';
import { describe, expect, test } from 'vitest';

describe('test create user rpc', () => {
  const caller = appRouter.createCaller({});

  test.each([11, 12, 13])(
    'should return user obj and with id: %i',
    async (id) => {
      const input: TUser = {
        name: 'namename',
        email: 'email@email.com',
        website: 'website.com',
        phone: '1234567899 x12345',
        company: { name: 'companyName' },
      };

      const result = await caller.user.create(input);

      expect(result.name).toBe('namename');
      expect(result.email).toBe('email@email.com');
      expect(result.website).toBe('website.com');
      expect(result.phone).toBe('1234567899 x12345');
      expect(result.company.name).toBe('companyName');
      expect(result.id).toBe(id);
    }
  );
});
