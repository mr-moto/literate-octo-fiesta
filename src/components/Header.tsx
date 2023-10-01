'use client';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

import { Container } from './Container';

export const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <Container element="header">
      <span>BCGovDashboard</span>
      {!isSignedIn ? <SignInButton mode="modal" /> : <SignOutButton />}
    </Container>
  );
};
