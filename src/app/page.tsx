'use client';

import { UserList } from '@/components/UserList';
import { UtilBar } from '@/components/UtilBar';

export default function Home() {
  return (
    <>
      <UtilBar />
      <UserList />
    </>
  );
}
