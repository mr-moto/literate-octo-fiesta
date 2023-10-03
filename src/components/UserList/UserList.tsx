import { useMainContext } from '@/contexts/MainContext';
import { Container } from '@/components/Container';

import { UserCard } from './UserCard';

export const UserList = () => {
  const { users, searchResults } = useMainContext();

  return (
    <Container>
      <ul className="flex flex-col gap-4">
        {searchResults.length
          ? searchResults.map((user) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))
          : users.map((user) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
      </ul>
    </Container>
  );
};
