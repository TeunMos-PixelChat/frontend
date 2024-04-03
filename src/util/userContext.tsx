import React, { createContext, useState } from "react";
import { User } from "@auth0/auth0-react";

export const UserContext = createContext({
  user: undefined as User | undefined,
  setUser: (user: User | undefined) => {},
});


export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
