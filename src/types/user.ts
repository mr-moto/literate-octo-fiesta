import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty(),
  username: z.string().optional(),
  email: z.string().email().nonempty(),
  address: z
    .object({
      street: z.string(),
      suite: z.string(),
      city: z.string(),
      zipcode: z.string(),
      geo: z.object({
        lat: z.string(),
        lng: z.string(),
      }),
    })
    .optional(),
  phone: z.string().nonempty(),
  website: z.string().nonempty(),
  company: z.object({
    name: z.string().nonempty(),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }),
});

export type TUser = z.infer<typeof userSchema>;
