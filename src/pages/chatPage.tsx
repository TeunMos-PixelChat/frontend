

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDmMessages, sendMessage, type GetMessagesResponse } from '../util/messageApiFunctions';
import { UserContext } from '../util/providers/userContext';
import { CodeHighlight } from '@mantine/code-highlight';
import { ActionIcon, Card, Group, ScrollArea, Stack, TextInput, Text } from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';
import GoogleIcon from '../components/googleIcon';
import { getUserById, type GetUserResponse } from '../util/userServiceFunctions';
import { useAuth0, type User } from '@auth0/auth0-react';

export default function ChatPage() {
  const { id: chatUserId } = useParams();
  const { generalAccesToken: accesToken, user } = useContext(UserContext);
  const { user: auth0user } = useAuth0();

  const [chatMessages, setChatMessages] = useState<GetMessagesResponse['messages'] | undefined>();
  const [otherUser, setOtherUser] = useState<GetUserResponse | undefined>();

  async function send(message: string) {
    if (!accesToken || !chatUserId) {
      return;
    }
    await sendMessage(accesToken, chatUserId, message);

    getDmMessages(accesToken, chatUserId).then(res => {
      setChatMessages(res.messages.reverse());
    });
  }

  useEffect(() => {
    console.log("chatUserId", chatUserId);

    if (!chatUserId || !accesToken) {
      return;
    }

    // get messages
    getDmMessages(accesToken, chatUserId).then(res => {
      setChatMessages(res.messages.reverse());
    });

    getUserById(accesToken, chatUserId).then(res => {
      setOtherUser(res);
    });

  }, [chatUserId, accesToken]);
  
  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle={`Chat with ${otherUser?.nickname}`}/>
    }>
      <Group style={{display: "block"}}>
        <ScrollArea style={{height: "calc(100vh - 160px)", width: "100%"}}>

          <Stack style={{margin: "10px"}}>
            {chatMessages && chatMessages.map((message) => {
              return (
                <ChatCard
                  message={message}
                  user={user}
                  otherUser={otherUser}
                  auth0user={auth0user}
                />
              );
            })} 
          </Stack>
        </ScrollArea>
        <ChatBox submit={(message: string) => send(message)} />
      </Group>
    </InnerHeader>
  );
}

function ChatBox({submit}: {submit: (message: string) => void}){
  const [textFieldValue, setTextFieldValue] = useState("");

  function send() {
    submit(textFieldValue);
    setTextFieldValue("");
  }


  const iconButton = <ActionIcon onClick={() => send()} variant="default"><GoogleIcon icon="send"/></ActionIcon>;

  return (
    <Group style={{display: "block"}}  m={'lg'}>
      <TextInput
        label="Send a message"
        placeholder="bababa"
        value={textFieldValue}
        onChange={(event) => setTextFieldValue(event.currentTarget.value)}
        onSubmit={() => {console.log("onsub");send()}}
        rightSection={iconButton}
        onKeyDown={(ev) => {
          if(ev.key === 'Enter') {
            send();
          }
        }}
      />
    </Group>
    
  );
}

function ChatCard({message, user, otherUser, auth0user}: 
  {message: GetMessagesResponse["messages"][0], user:  User | undefined, otherUser: GetUserResponse | undefined, auth0user: User | undefined}
) {

  console.log("message", message);
  console.log("user", user);
  console.log("otherUser", otherUser);

  const isMe = message.sender_id === auth0user?.sub;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section>
        {isMe ? (
          <Text style={{margin:'5px'}} size='sm' fw={700}>{user?.nickname}</Text>
        ) : (
          <Text style={{margin:'5px'}} size='sm'>{otherUser?.nickname}</Text>
        )
        }

      </Card.Section>
      <Card.Section>
        <Text style={{margin:'5px'}}>{message.message}</Text>
      </Card.Section>
    </Card>
  );
}