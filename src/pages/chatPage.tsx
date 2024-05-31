

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteMessage, getDmMessages, sendMessage, type GetMessagesResponse } from '../util/messageApiFunctions';
import { UserContext } from '../util/providers/userContext';
import { ActionIcon, Group, ScrollArea, Stack, TextInput, Text, Flex, Avatar } from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';
import GoogleIcon from '../components/googleIcon';
import { useScrollIntoView } from '@mantine/hooks';

export default function ChatPage() {
  const { id: chatUserId } = useParams();
  const { generalAccesToken: accesToken } = useContext(UserContext);
  
  const [chatMessages, setChatMessages] = useState<GetMessagesResponse['messages'] | undefined>();
  const [otherUser, setOtherUser] = useState<GetMessagesResponse['users']['other'] | undefined>();
  const [messageUser, setMessageUser] = useState<GetMessagesResponse['users']['you'] | undefined>();

  async function send(message: string) {
    if (!accesToken || !chatUserId) {
      return;
    }
    await sendMessage(accesToken, chatUserId, message);

    refreshMessages();
  }

  function refreshMessages() {
    if (!accesToken || !chatUserId) {
      return;
    }
    getDmMessages(accesToken, chatUserId).then(res => {
      setChatMessages(res.messages.reverse());
      setOtherUser(res.users.other);
      setMessageUser(res.users.you);
    });
  }



  useEffect(() => {
    console.log("chatUserId", chatUserId);

    if (!chatUserId || !accesToken) {
      return;
    }

    refreshMessages();

  }, [chatUserId, accesToken]);

  useEffect(() => {
    document.getElementById('end-messages')?.scrollIntoView({behavior: 'smooth'});
  }, [chatMessages]);

  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle={`Chat with ${otherUser?.nickname}`}/>
    }>
      <Group style={{display: "block"}}>
        <ScrollArea style={{height: "calc(100vh - 160px)", width: "100%"}}>

          <Stack style={{margin: "20px"}}>
            {(chatMessages && otherUser && messageUser)  && chatMessages.map((message) => {
              return (
                <ChatCard
                  key={message.id}
                  message={message}
                  user={message.sender_id === chatUserId ? otherUser : messageUser}
                  isMe={message.sender_id === messageUser.id}
                  refresh={refreshMessages}
                />
              );
            })} 
            <div id='end-messages'></div>
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

function ChatCard(
  {message, user, isMe, refresh}: 
  {
    message: GetMessagesResponse["messages"][0], 
    user: GetMessagesResponse['users']['you']  | GetMessagesResponse['users']['other'], 
    isMe: boolean,
    refresh: () => void
  }
) {
  const { generalAccesToken: accesToken } = useContext(UserContext);

  async function deleteUserMessage() {
    if (!accesToken) {
      return;
    }
    await deleteMessage(accesToken, message)
    refresh()
  }

  return (
    <Group style={{display: "block"}}>
      <Flex 
        justify="flex-start" 
        gap="md"
        direction="row"
      >
        <Avatar src={user.picture}/>
        <Flex 
          justify="flex-start" 
          gap="sm"
          direction="column"
        >
          <Flex
            justify="flex-start" 
            gap="sm"
            direction="row"
          >
            { isMe ? (
              <Text size='lg' fw={700} >{user.nickname}</Text>
            ) : (
              <Text size='lg' >{user.nickname}</Text>
            )}


            <Text size='sm'fw={500} c='gray'>{new Date(message.created_at).toLocaleString()}</Text>
          </Flex>
          

          <Text style={{margin:'5px'}}>{message.message}</Text>
        </Flex>
        <div style={{flexGrow: 1}}></div>
        { isMe ? (
          <ActionIcon variant="default" onClick={deleteUserMessage}>
            <GoogleIcon icon="delete"/>
          </ActionIcon>
        ) : (
          <div></div>
        )}
      </Flex>
    </Group>
  );
}