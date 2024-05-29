import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL || "/api";

export type GetUserResponse = {
  id: string;
  name: string;
  nickname: string;
  picture: string;
};


export async function getAllUsers(accessToken: string): Promise<GetUserResponse[]> {
  const resp = await axios.get<GetUserResponse[]>(`${apiURL}/user/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return resp.data;
}

export async function getAllUsersExceptMe(accessToken: string, userId: string): Promise<GetUserResponse[]> {
  const resp = await getAllUsers(accessToken);
  return resp.filter(user => user.id !== userId);
}

export async function getUserById(accessToken: string, userId: string) {
  const resp = await axios.get<GetUserResponse>(`${apiURL}/user/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return resp.data;
}