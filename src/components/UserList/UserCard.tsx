'use client';
import React, { useState } from 'react';
import { useMainContext } from '@/contexts/MainContext';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Globe, Mail, Pencil, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUser, userSchema } from '@/types/user';
import { trpc } from '@/app/_trpc/client';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';

export const UserCard = ({ user }: { user: TUser }) => {
  const { users, setUsers } = useMainContext();
  const { isSignedIn } = useUser();

  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: { name: user.company.name },
    },
  });

  const updateUser = trpc.user.update.useMutation({
    onSuccess: (data) => {
      const usersCopy = [...users];
      const index = usersCopy.findIndex((user) => user.id === data.id);

      usersCopy[index] = data;

      setUsers(usersCopy);

      toast({
        title: 'User Updated',
        duration: 2000,
      });

      setDialogOpen(false);

      form.reset();
    },
    onError: (err) => {
      //handle errors here
    },
  });
  return (
    <Card className="pb-2">
      <CardHeader className="flex flex-row items-center space-y-0 gap-4">
        <CardTitle className="flex-1">{user.name}</CardTitle>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {isSignedIn ? (
            <DialogTrigger asChild>
              <Button variant="outline" className="p-2 h-auto">
                <Pencil className="h-4 w-4" color="hsl(var(--primary))" />
              </Button>
            </DialogTrigger>
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Pencil className="h-4 w-4" color="hsl(var(--primary))" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Login to edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <DialogContent
            className="w-[calc(100%-32px)] rounded-[--radius]"
            // onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Update User</DialogTitle>
              <DialogDescription>
                Certain features require you to be logged in.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  updateUser.mutate(values)
                )}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  disabled={updateUser.isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  disabled={updateUser.isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  disabled={updateUser.isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  disabled={updateUser.isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company.name"
                  disabled={updateUser.isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={updateUser.isLoading}
                >
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
      </CardHeader>
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
        <CardContent className="pb-4 flex gap-4">
          <Mail />
          <span>{user.email}</span>
        </CardContent>
        <CardContent className="pb-4 flex gap-4">
          <Phone />
          <span>{user.phone}</span>
        </CardContent>
        <CardContent className="pb-4 flex gap-4">
          <Globe />
          <span>{user.website}</span>
        </CardContent>
        <CardContent className="pb-4 flex gap-4">
          <Building />
          <span>{user.company.name}</span>
        </CardContent>
      </div>
    </Card>
  );
};
