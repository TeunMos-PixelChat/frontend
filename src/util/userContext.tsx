import React, { createContext, useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { getUserMetadata } from "./auth0ApiFunctions";

export const UserContext = createContext({
  user: undefined as User | undefined,
});


export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAccessTokenSilently, user: auth0user } = useAuth0();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (auth0user?.sub) {
      getUserMetadata(auth0user.sub, getAccessTokenSilently).then((user) => {
        console.log("user", user);
        setUser(user);
      }).catch((err) => {
        setUser(auth0user)
      });
    }
  }, [auth0user, getAccessTokenSilently]);


  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

