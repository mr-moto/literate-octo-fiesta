'use client';
import { useClerk, useUser } from '@clerk/nextjs';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { LoginButton } from './LoginButton';
import { toast } from '../ui/use-toast';

export const Header = () => {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed Out',
      duration: 2000,
    });
  };

  return (
    <Container
      element="header"
      className="border-b border-[--border] shadow-md"
      innerClassName="flex justify-between items-center py-4"
    >
      <span className="font-bold text-lg">BCGov 🇨🇦</span>
      <div className={cn('flex', ' sm:hidden')}>
        <DropdownMenu onOpenChange={() => setMenuOpen(!menuOpen)}>
          <DropdownMenuTrigger asChild>
            <Button className="h-auto p-2">
              <Menu
                className={cn(
                  'h-5 w-5 scale-100 transition-all',
                  menuOpen && 'scale-0'
                )}
              />
              <X
                className={cn(
                  'h-5 w-5 absolute scale-0 transition-all',
                  menuOpen && 'scale-100'
                )}
              />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              {!isSignedIn ? (
                <LoginButton />
              ) : (
                <Button onClick={handleSignOut}>Sign Out</Button>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={cn('hidden items-center gap-4', 'sm:flex')}>
        {!isSignedIn ? (
          <LoginButton />
        ) : (
          <Button onClick={handleSignOut}>Sign Out</Button>
        )}
        <ModeToggle />
      </div>
    </Container>
  );
};
