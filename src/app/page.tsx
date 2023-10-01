'use client';
import { Container } from '@/components/Container';
import { CreateUserButton } from '@/components/CreateUserButton';
import { UserCard } from '@/components/UserCard';
import { useMainContext } from '@/contexts/MainContext';

export default function Home() {
  const { users } = useMainContext();

  return (
    <Container>
      <CreateUserButton />
      <h1>Users:</h1>
      <ul className="flex flex-col gap-4">
        {users.map((user) => (
          <li key={user.id} className="border border-black p-4">
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
