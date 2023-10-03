'use client';
import React, { useState } from 'react';
import { Container } from './Container';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { X, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

import {
  Dialog,
  DialogContent,
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/types/user';
import { TUser } from '@/types/user';
import { trpc } from '@/app/_trpc/client';
import { useMainContext } from '@/contexts/MainContext';
import { toast } from './ui/use-toast';

export const UtilBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setUsers, search, setSearchResults, fuse } = useMainContext();

  const form = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '' },
    },
  });

  const createUser = trpc.user.create.useMutation({
    onSuccess: (data) => {
      setUsers((prev) => [...prev, data]);
      fuse?.add(data);
      toast({
        title: 'User Created',
        duration: 2000,
      });
      setDialogOpen(false);
      form.reset();
    },
    onError: (err) => {
      //handle errors here
    },
  });

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <Container
      innerClassName={cn(
        'flex-col py-4 flex gap-4',
        'sm:flex-row sm:items-end sm:justify-between'
      )}
    >
      <div className={cn('flex gap-4', 'flex-1')}>
        <div className="relative flex-1 flex items-center">
          <Input
            type="text"
            placeholder="Search by name"
            className="flex-1 pr-10"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            className="absolute right-2 p-1 h-auto"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="icon"
          disabled={!searchQuery}
          onClick={() => search(searchQuery)}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create User</Button>
        </DialogTrigger>
        <DialogContent className="w-[calc(100%-32px)] rounded-[--radius]">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                createUser.mutate(values)
              )}
              className="space-y-2"
            >
              <FormField
                disabled={createUser.isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={createUser.isLoading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={createUser.isLoading}
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="phone"
                        {...field}
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={createUser.isLoading}
                control={form.control}
                name="website"
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
                disabled={createUser.isLoading}
                control={form.control}
                name="company.name"
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
                disabled={createUser.isLoading}
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
    </Container>
  );
};
