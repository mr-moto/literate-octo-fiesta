import { router, publicProcedure } from '@/server/trpc';
import { userSchema } from '@/types/user';

import { z } from 'zod';

export const usersRouter = router({
  getAll: publicProcedure.output(z.array(userSchema)).query(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    return users;
  }),
});
