import { User } from "@auth0/auth0-react";
import axios from "axios";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export async function getUserMetadata(userId: User["sub"], accessToken: string) {
  const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userId}`;

  const metadataResponse = await axios.get<User>(userDetailsByIdUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return metadataResponse.data;
}