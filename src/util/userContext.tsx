import React, { createContext, useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const UserContext = createContext({
  user: undefined as User | undefined,
  // setUser: (user: User | undefined) => {},
});


export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAccessTokenSilently, user: auth0user } = useAuth0();
  const [user, setUser] = useState<User | undefined>(undefined);


  useEffect(() => {
    async function getUserMetadata(userId: User["sub"]) {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });
  
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userId}`;
  
      const metadataResponse = await axios.get<User>(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("metadataResponse", metadataResponse);
      return metadataResponse.data;
    };


    if (auth0user?.sub) {
      getUserMetadata(auth0user.sub).then((user) => {
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

