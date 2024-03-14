import React, { useEffect } from 'react';
import { Group, Center, Code, Stack, Loader, Flex } from '@mantine/core';
import axios from 'axios';
import { CodeHighlight } from '@mantine/code-highlight';

// use webRTC to create a voice chat
// async function initwebRTC() {
//   const pc = new RTCPeerConnection();

//   // Get local media stream
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   stream.getTracks().forEach(track => pc.addTrack(track, stream));

//   // Create an offer
//   const offer = await pc.createOffer();
//   await pc.setLocalDescription(offer);

//   // Send the offer to the remote peer

  
// }


export default function Home() {
  const [response, setResponse] = React.useState<object | undefined>();

  const apiURL = process.env.REACT_APP_API_URL || "api";

  useEffect(() => {
    axios.post(`${apiURL}/test`, {
      message: "hello from frontend",
    }).then(res => {
      console.log(res);
      setResponse(res.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);




  return (
    <Group style={{display: "block"}}>
      <Center h={400}>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap">
          
          {response ? (
            // <Code style={{fontSize: "1.5rem"}}>{ JSON.stringify(response, null, 2) }</Code>
            <CodeHighlight style={{fontSize: "1.5rem"}} code={ JSON.stringify(response, null, 2) } language="json" />
          ) : (
            <Loader />
          )}
          <Stack>
            <Code>{apiURL}</Code>
            
            <Code>Env: {process.env.NODE_ENV}</Code>
            <Code>Branch: {process.env.REACT_APP_BRANCH}</Code>
          </Stack>
        </Flex>
      </Center>
    </Group>
  );
}