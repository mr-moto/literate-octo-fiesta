'use client';
import { trpc } from '@/app/_trpc/client';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TUser } from '@/types/user';
import { RouterOutput } from '@/server';

type TStatus = 'error' | 'idle' | 'loading' | 'success';

type TMainContext = {
  users: RouterOutput['users']['getAll'] | [];
  createUser: (input: TUser) => void;
  createUserStatus: TStatus;
  updateUser: (input: TUser) => void;
  updateUserStatus: TStatus;
};

export const MainContext = createContext<TMainContext>({
  users: [],
  createUser: () => {},
  createUserStatus: 'loading',
  updateUser: () => {},
  updateUserStatus: 'loading',
});

export const MainContextProvider = ({
  children,
  initialUserData,
}: {
  children: ReactNode;
  initialUserData: TUser[];
}) => {
  const userCreate = trpc.user.create.useMutation();
  const userUpdate = trpc.user.update.useMutation();
  const [users, setUsers] = useState(initialUserData);

  useEffect(() => {
    if (userCreate.isSuccess) {
      setUsers((prev) => [...prev, userCreate.data]);
    }
  }, [userCreate.data, userCreate.isSuccess]);

  return (
    <MainContext.Provider
      value={{
        users,
        createUser: (input) => userCreate.mutate(input),
        createUserStatus: userCreate.status,
        updateUser: (input) => userUpdate.mutate(input),
        updateUserStatus: userUpdate.status,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
