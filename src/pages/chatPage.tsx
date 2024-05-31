

import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteMessage, getDmMessages, sendMessage, type GetMessagesResponse } from '../util/messageApiFunctions';
import { UserContext } from '../util/providers/userContext';
import { ActionIcon, Group, ScrollArea, Stack, TextInput, Text, Flex, Avatar } from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';
import GoogleIcon from '../components/googleIcon';

export default function ChatPage() {
  const { id: chatUserId } = useParams();
  const { generalAccesToken: accesToken } = useContext(UserContext);

  const [isDoingSomething, setIsDoingSomething] = useState(false);
  
  const [chatMessages, setChatMessages] = useState<GetMessagesResponse['messages'] | undefined>();
  const [otherUser, setOtherUser] = useState<GetMessagesResponse['users']['other'] | undefined>();
  const [messageUser, setMessageUser] = useState<GetMessagesResponse['users']['you'] | undefined>();

  async function send(message: string) {
    if (!accesToken || !chatUserId) {
      return;
    }
    await sendMessage(accesToken, chatUserId, message);

    await refreshMessages();
    scrollToBottom();
    setIsDoingSomething(false);
  }

  const refreshMessages = useCallback(async () => {
    if (!accesToken || !chatUserId) {
      return;
    }
    const res = await getDmMessages(accesToken, chatUserId)

    setChatMessages(res.messages.reverse());
    setOtherUser(res.users.other);
    setMessageUser(res.users.you);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accesToken, chatUserId]);

  // refresh messages every 5 seconds (polling)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshMessages]);



  useEffect(() => {
    if (!chatUserId || !accesToken) {
      return;
    }

    setIsDoingSomething(false);
    refreshMessages().then(() => {
      scrollToBottom(false);
    });
  }, [chatUserId, accesToken, refreshMessages]);

  useEffect(() => {
    if (!isDoingSomething) {
      scrollToBottom();

      if (chatMessages && chatMessages.length > 0) {
        setIsDoingSomething(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages]);

  useEffect(() => {
    setIsDoingSomething(false);
  }, [setIsDoingSomething]);

  function scrollToBottom(smooth: boolean = true) {

    setTimeout(() => {
      
    }, 100);

    if (smooth) {
      document.getElementById('end-messages')?.scrollIntoView({behavior: 'smooth'});
    }
    else {
      document.getElementById('end-messages')?.scrollIntoView();
    }
  }

  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle={`Chat with ${otherUser?.nickname}`}/>
    }>
      <Group style={{display: "block"}}>
        <ScrollArea style={{height: "calc(100vh - 160px)", width: "100%"}} id='message-scrolls'>

          <Stack style={{margin: "20px"}}>
            {(chatMessages && otherUser && messageUser)  && chatMessages.map((message) => {
              return (
                <ChatCard
                  key={message.id}
                  message={message}
                  user={message.sender_id === chatUserId ? otherUser : messageUser}
                  isMe={message.sender_id === messageUser.id}
                  refresh={refreshMessages}
                  setIsDoingSomething={setIsDoingSomething}
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
        placeholder="Type your message here..."
        value={textFieldValue}
        onChange={(event) => setTextFieldValue(event.currentTarget.value)}
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
  {message, user, isMe, refresh, setIsDoingSomething}: 
  {
    message: GetMessagesResponse["messages"][0], 
    user: GetMessagesResponse['users']['you']  | GetMessagesResponse['users']['other'], 
    isMe: boolean,
    refresh: () => Promise<void>,
    setIsDoingSomething?: (isDoingSomething: boolean) => void
  }
) {
  const { generalAccesToken: accesToken } = useContext(UserContext);

  async function deleteUserMessage() {
    if (!accesToken) {
      return;
    }
    setIsDoingSomething?.(true)
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