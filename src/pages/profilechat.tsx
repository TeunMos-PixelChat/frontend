import React, { useEffect } from 'react';
import { Group, Center, Title, Button } from '@mantine/core';
import GoogleIcon from '../components/googleIcon';


// use webRTC to create a voice chat
async function initwebRTC() {
  const pc = new RTCPeerConnection();

  // Get local media stream
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));

  // Create an offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // Send the offer to the remote peer

  
}


export default function Home() {

  useEffect(() => {

  }, []);




  return (
    <Group style={{display: "block"}}>
      <Center h="100vh">
        
      </Center>
    </Group>
  );
}