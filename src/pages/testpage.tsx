import React, { useEffect } from 'react';
import { Group, Center, Code, Stack, Loader, Flex, Button } from '@mantine/core';
import axios from 'axios';
import { InlineCodeHighlight } from '@mantine/code-highlight';

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

  // use "api" if there is no REACT_APP_API_URL, which is when using the gateway
  const apiURL = process.env.REACT_APP_API_URL || "api";

  useEffect(() => {
    getAPIData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getAPIData() {
    setResponse(undefined);
    axios.post(`${apiURL}/test`, {
      message: "hello from frontend",
    }).then(res => {
      console.log(res);
      setResponse(res.data);
    }).catch(err => {
      console.error(err);
    });
  }



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
            <InlineCodeHighlight style={{fontSize: 25, fontWeight: 600}} code={ JSON.stringify(response, null, 2) } language="json" />
          ) : (
            <Loader />
          )}
          <Button onClick={getAPIData}>
            Refetch data from backend
          </Button>
          <Stack>
            <Code>Backend url: {apiURL}</Code>
            <Code>Env: {process.env.NODE_ENV}</Code>
            <Code>Branch: {process.env.REACT_APP_BRANCH}</Code>
          </Stack>
        </Flex>
      </Center>
    </Group>
  );
}