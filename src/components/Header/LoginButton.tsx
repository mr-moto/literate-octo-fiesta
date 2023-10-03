'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSignIn } from '@clerk/nextjs';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '../ui/use-toast';
import { instanceOfClerkError } from '@/utils/instanceOfClerkError';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

type TFormSchema = z.infer<typeof formSchema>;

export const LoginButton = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const { signIn, setActive, isLoaded } = useSignIn();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  if (!isLoaded) {
    return null;
  }

  const onSubmit = async (values: TFormSchema) => {
    try {
      const result = await signIn.create({
        identifier: values.username,
        password: values.password,
      });

      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });
        toast({
          title: 'Login Successful',
          duration: 2000,
        });
      } else {
        //handle errors more gracefully with a custom error handler
        throw new Error('something went wrong');
      }
    } catch (error) {
      if (instanceOfClerkError(error)) {
        form.setError('root', {
          message: error.errors[0].message,
        });
        return;
      }
      if (error instanceof Error) {
        form.setError('root', {
          message: error.message,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-32px)] rounded-[--radius]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Certain features require you to be logged in.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
            {form.formState.errors.root?.message && (
              <span className="text-destructive">
                {form.formState.errors.root.message}
              </span>
            )}
          </form>
          <FormMessage />
        </Form>
      </DialogContent>
    </Dialog>
  );
};
