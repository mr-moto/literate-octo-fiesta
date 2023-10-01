'use client';
import { trpc } from '@/app/_trpc/client';
import { useMainContext } from '@/contexts/MainContext';
import { TUser } from '@/types/user';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export const UserCard = ({ user }: { user: TUser }) => {
  const { isSignedIn } = useUser();
  const { users, setUsers } = useMainContext();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user);
  const [dirty, setDirty] = useState(false);

  const updateUser = trpc.user.update.useMutation({
    onSuccess: (data) => {
      const usersCopy = [...users];
      const index = usersCopy.findIndex((user) => user.id === data.id);
      usersCopy[index] = data;
      setUsers(usersCopy);
      setEditMode(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!Object.is(userData, user)) {
      setDirty(true);
    } else {
      setDirty(false);
    }
  }, [userData]);

  const handleCancelEdit = () => {
    setEditMode(false);
    setDirty(false);
    setUserData(user);
  };

  const handleUpdateUser = () => {
    if (dirty) {
      updateUser.mutate(userData);
    } else {
      setEditMode(false);
    }
  };

  return (
    <div>
      {editMode ? (
        <div>
          <div>
            <label htmlFor="name">name: </label>
            <input
              type="text"
              value={userData.name}
              className="border border-black"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              id="name"
              disabled={updateUser.isLoading}
            />
          </div>
          <div>
            <label htmlFor="email">email: </label>
            <input
              type="text"
              value={userData.email}
              className="border border-black"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              id="email"
              disabled={updateUser.isLoading}
            />
          </div>
          <div>
            <label htmlFor="phone">phone: </label>
            <input
              type="text"
              value={userData.phone}
              className="border border-black"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              id="phone"
              disabled={updateUser.isLoading}
            />
          </div>
          <div>
            <label htmlFor="website">website: </label>
            <input
              type="text"
              value={userData.website}
              className="border border-black"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, website: e.target.value }))
              }
              id="website"
              disabled={updateUser.isLoading}
            />
          </div>
          <div>
            <label htmlFor="company">company: </label>
            <input
              type="text"
              value={userData.company.name}
              className="border border-black"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  company: { name: e.target.value },
                }))
              }
              id="company"
              disabled={updateUser.isLoading}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>name: {userData.name}</p>
          <p>email: {userData.email}</p>
          <p>phone: {userData.phone}</p>
          <p>website: {userData.website}</p>
          <p>company: {userData.company.name}</p>
        </div>
      )}
      {editMode ? (
        <>
          <button
            onClick={handleUpdateUser}
            type="button"
            disabled={updateUser.isLoading}
          >
            submit
          </button>
          <button
            onClick={handleCancelEdit}
            type="button"
            disabled={updateUser.isLoading}
          >
            cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          type="button"
          disabled={!isSignedIn}
        >
          Edit
        </button>
      )}
    </div>
  );
};
