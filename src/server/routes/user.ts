import { api } from '@/constants';
import { router, publicProcedure, privateProcedure } from '@/server/trpc';
import { userSchema } from '@/types/user';

let id = 10;

export const userRouter = router({
  create: publicProcedure
    .input(userSchema)
    .output(userSchema)
    .mutation(async ({ input }) => {
      const res = await fetch(`${api}/users`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      //jsonplaceholder does not increment ID. we will do this manually here. this will get reset to 10 when server session ends
      id++;

      return { ...data, id };
    }),
  update: privateProcedure
    .input(userSchema)
    // .output(userSchema)
    .mutation(async ({ input }) => {
      // jsonplaceholder does not allow updating users whose IDs are greater than 10. We will pretend it will update by just returning the input as is if ID is greater than 10.
      if (input.id! <= 10) {
        const res = await fetch(`${api}/users/${input.id}`, {
          method: 'PUT',
          body: JSON.stringify(input),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        return await res.json();
      }
      if (input.id! > 10) {
        return input;
      }
    }),
});
