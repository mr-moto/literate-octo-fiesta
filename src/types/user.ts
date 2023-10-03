import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  username: z.string().optional(),
  email: z.string(),
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
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }),
});

export type TUser = z.infer<typeof userSchema>;
