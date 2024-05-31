import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL || "api";

export type StrippedUser = {
  id: string;
  name: string;
  nickname: string;
  picture: string;
};

export type GetMessagesResponse = {
  messages: {
    id: string;
    message: string;
    sender_id: string;
    receiver_id: string;
    created_at: string;
    updated_at: string;
  }[];
  nextPageStates: {
    user1: string | null;
    user2: string | null;
  } | null;
  users: {
    you: StrippedUser;
    other: StrippedUser;
  };
};


export async function getDmMessages(accessToken: string, userId: string) {
  const resp = await axios.get<GetMessagesResponse>(`${apiURL}/message/dm/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return resp.data;
}

export async function sendMessage(accessToken: string, receiverId: string, message: string): Promise<object> {
  const resp = await axios.post(`${apiURL}/message/dm/`, {
    message: message,
    receiver_id: receiverId,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return resp.data;
}

export async function deleteMessage(accessToken: string, message: GetMessagesResponse['messages'][0]): Promise<object> {
  const resp = await axios.delete(`${apiURL}/message/dm/${message.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      receiver_id: message.receiver_id,
      created_at: message.created_at,
    },
  });

  return resp.data;
}