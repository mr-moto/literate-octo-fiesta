'use client';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { TUser } from '@/types/user';

type TMainContext = {
  users: TUser[];
  setUsers: Dispatch<SetStateAction<TUser[]>>;
};

export const MainContext = createContext<TMainContext>({
  users: [],
  setUsers: () => {},
});

export const MainContextProvider = ({
  children,
  initialUserData,
}: {
  children: ReactNode;
  initialUserData: TUser[];
}) => {
  const [users, setUsers] = useState<TUser[]>(initialUserData);

  return (
    <MainContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
