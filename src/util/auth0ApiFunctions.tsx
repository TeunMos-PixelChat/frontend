import { User } from "@auth0/auth0-react";
import axios from "axios";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export type FullAuth0User = User & {
  user_id: string;
}

export async function getUserMetadata(userId: User["sub"], accessToken: string) {
  const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userId}`;

  const metadataResponse = await axios.get<FullAuth0User>(userDetailsByIdUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return metadataResponse.data;
}

