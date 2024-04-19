import { User, type GetTokenSilentlyOptions } from "@auth0/auth0-react";
import axios from "axios";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export async function getUserMetadata(userId: User["sub"], getAccessTokenSilently: (options: GetTokenSilentlyOptions) => Promise<string>) {
  const accessToken = await getAccessTokenSilently({
    authorizationParams: {
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    },
  });
  console.log("accessToken")
  console.log(accessToken);


  const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userId}`;

  const metadataResponse = await axios.get<User>(userDetailsByIdUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return metadataResponse.data;
}