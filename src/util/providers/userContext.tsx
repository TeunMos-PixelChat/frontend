import React, { createContext, useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { getUserMetadata } from "../auth0ApiFunctions";



const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const UserContext = createContext({
  user: undefined as User | undefined,
  fetchUser: async (): Promise<User | undefined> => {
    return undefined;
  }
});


export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user: auth0user } = useAuth0();
  const [user, setUser] = useState<User | undefined>(undefined);


  useEffect(() => {
    console.log("auth0user", auth0user);

    if (auth0user?.sub) {
      getUserData(auth0user.sub).then((user) => {
        setUser(user);
      }).catch(err => {
        console.error(err);
        setUser(undefined);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0user, getAccessTokenSilently, getAccessTokenWithPopup]);

  async function getUserData(userId: User["sub"]): Promise<User | undefined> {
    const authparams = {
      authorizationParams: {
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      },
    }

    try {
      const accessToken = await getAccessTokenSilently(authparams);
      return await getUserMetadata(userId, accessToken);
    } catch (err) {
      console.error(err);
      const accessToken = await getAccessTokenWithPopup(authparams, { popup: window.open()});
      if (!accessToken) {
        return undefined;
      }
      return await getUserMetadata(userId, accessToken);
    }
  }

  async function fetchUser(): Promise<User | undefined>{
    if (auth0user?.sub) {
      const user = await getUserData(auth0user.sub);
      setUser(user);
      return user;
    }
    else {
      setUser(undefined);
      return undefined;
    }
  }
  

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

