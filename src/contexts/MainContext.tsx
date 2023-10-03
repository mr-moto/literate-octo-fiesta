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
import Fuse from 'fuse.js';
import { toast } from '@/components/ui/use-toast';

type TMainContext = {
  users: TUser[];
  setUsers: Dispatch<SetStateAction<TUser[]>>;
  search: (searchQuery: string) => void;
  searchResults: TUser[];
  setSearchResults: Dispatch<SetStateAction<TUser[]>>;
  fuse: Fuse<TUser> | null;
};

export const MainContext = createContext<TMainContext>({
  users: [],
  setUsers: () => {},
  search: () => {},
  searchResults: [],
  setSearchResults: () => {},
  fuse: null,
});

export const MainContextProvider = ({
  children,
  initialUserData,
}: {
  children: ReactNode;
  initialUserData: TUser[];
}) => {
  const [users, setUsers] = useState<TUser[]>(initialUserData);
  const [searchResults, setSearchResults] = useState<TUser[]>([]);

  const fuse = new Fuse(users, { keys: ['name'], threshold: 0.3 });

  const search = (searchQuery: string) => {
    const result = fuse.search(searchQuery).map((data) => data.item);

    if (!result.length) {
      toast({
        title: 'No User Found',
        duration: 2000,
      });
    } else {
      setSearchResults(result);
    }
  };

  return (
    <MainContext.Provider
      value={{
        users,
        setUsers,
        search,
        searchResults,
        setSearchResults,
        fuse,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
