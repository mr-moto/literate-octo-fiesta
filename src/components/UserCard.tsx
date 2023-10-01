'use client';
import { trpc } from '@/app/_trpc/client';
import { useMainContext } from '@/contexts/MainContext';
import { TUser } from '@/types/user';
import { useEffect, useState } from 'react';

export const UserCard = ({ user }: { user: TUser }) => {
  const { users, setUsers } = useMainContext();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user);

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

  const handleCancelEdit = () => {
    setEditMode(false);
    setUserData(user);
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
            onClick={() => updateUser.mutate(userData)}
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
        <button onClick={() => setEditMode(true)} type="button">
          Edit
        </button>
      )}
    </div>
  );
};
