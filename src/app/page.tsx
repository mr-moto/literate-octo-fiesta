'use client';
import { Container } from '@/components/Container';
import { CreateUserButton } from '@/components/CreateUserButton';
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
            <div>
              <p>name: {user.name}</p>
              <p>email: {user.email}</p>
              <p>phone: {user.phone}</p>
              <p>website: {user.website}</p>
              <p>company: {user.company.name}</p>
              <button
                onClick={() => console.log('edit user clicked')}
                type="button"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
