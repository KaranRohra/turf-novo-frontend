"use client";
import { createContext, FC, useContext } from "react";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  roles: string[];
  birthDate: string | null;
};

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({ user: null, setUser: () => null });

interface UserProviderProps extends UserContextType {
  children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children, user, setUser }) => {
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
