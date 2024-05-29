import React, { createContext, useEffect, useState } from "react";
import { User, useAuth0, type GetTokenSilentlyOptions, type RedirectLoginOptions } from "@auth0/auth0-react";
import { getUserMetadata } from "../auth0ApiFunctions";



const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const UserContext = createContext({
  user: undefined as User | undefined,
  fetchUser: async (): Promise<User | undefined> => {
    return undefined;
  },
  generalAccesToken: undefined as string | undefined,
});


export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAccessTokenSilently, getAccessTokenWithPopup, loginWithRedirect, user: auth0user } = useAuth0();
  const [user, setUser] = useState<User | undefined>(undefined);

  const [generalAccesToken, setGeneralAccessToken] = useState<string | undefined>(undefined);


  useEffect(() => {
    console.log("auth0user", auth0user);

    if (auth0user?.sub) {
      getUserData(auth0user.sub).then((user) => {
        setUser(user);
      }).catch(err => {
        console.error(err);
        setUser(undefined);
      });


      getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        },
      }).then(accessToken => {
        setGeneralAccessToken(accessToken);
      }).catch(err => {
        console.error(err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0user, getAccessTokenSilently, getAccessTokenWithPopup]);

  async function getUserData(userId: User["sub"]): Promise<User | undefined> {
    const authparams: GetTokenSilentlyOptions| RedirectLoginOptions = {
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
      
      // const accessToken = await getAccessTokenWithPopup(authparams, { popup: window.open()});
      let redirectparams = authparams as RedirectLoginOptions;

      redirectparams.appState = { targetUrl: window.location.pathname };

      await loginWithRedirect(redirectparams);
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
    <UserContext.Provider value={{ user, fetchUser, generalAccesToken }}>
      {children}
    </UserContext.Provider>
  );
}

