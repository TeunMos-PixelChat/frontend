import React, { createContext, useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { getUserMetadata } from "../auth0ApiFunctions";
import { time } from "console";



const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const UserContext = createContext({
  user: undefined as User | undefined,
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
    

    if (auth0user?.sub) {
      getUserData(auth0user.sub).then((user) => {
        setUser(user);
      }).catch(err => {
        console.error(err);
        setUser(undefined);
      });
    }
  }, [auth0user, getAccessTokenSilently,getAccessTokenWithPopup]);

  


  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

