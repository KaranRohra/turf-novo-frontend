"use client";
import React, { FC, useState } from "react";
import { User, UserProvider } from "./user-provider";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";

interface IProvideProps {
  children: React.ReactNode;
  userDetails: User | null;
}

export const Provider: FC<IProvideProps> = ({ children, userDetails }) => {
  const [userState, setUserState] = useState<User | null>(userDetails);
  return (
    <UserProvider user={userState} setUser={setUserState}>
      <body>
        <Header
          user={{
            isLoggedIn: userState?.firstName ? true : false,
            firstName: userState?.firstName ?? "",
          }}
          key={userState?.id}
        />
        {children}
        <Toaster />
      </body>
    </UserProvider>
  );
};
