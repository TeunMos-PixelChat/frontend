import React, { useEffect } from 'react';
import { Group, Center, Code, Stack, Loader } from '@mantine/core';
import axios from 'axios';

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

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/test`, {
      message: "Hello, world!"
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
        <Stack>
          {response ? (
            <Code style={{fontSize: "1.5rem"}}>{ JSON.stringify(response, null, 2) }</Code>
          ) : (
            <Loader />
          )}
          <Code>{process.env.REACT_APP_API_URL}</Code>
          <Code>Env: {process.env.NODE_ENV}</Code>
        </Stack>
      </Center>
    </Group>
  );
}