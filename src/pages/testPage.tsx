import React, { useEffect } from 'react';
import { Group, Center, Code, Stack, Loader, Flex, Button } from '@mantine/core';
import axios from 'axios';
import { CodeHighlight } from '@mantine/code-highlight';
import InnerHeader from '../components/shell/innerHeader';
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';

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
import { useAuth0 } from "@auth0/auth0-react";




export default function TestPage() {
  const [response, setResponse] = React.useState<object | undefined>();
  const { getAccessTokenSilently, user } = useAuth0();
  // const { user } = useContext(UserContext);

  useEffect(() => {
  }, [getAccessTokenSilently, user?.sub]);

  // use "api" if there is no REACT_APP_API_URL, which is when using the gateway
  const apiURL = process.env.REACT_APP_API_URL || "api";

  useEffect(() => {
    getAPIData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAPIData() {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `http://localhost/`,
        scope: "read:current_user",
      },
    });

    setResponse(undefined);
    axios.post(`${apiURL}/test`, {
      message: "hello from frontend",
    },
    {headers: {
      Authorization: `Bearer ${accessToken}`,
    }}
    ).then(res => {
      console.log(res);
      setResponse(res.data);
    }).catch(err => {
      console.error(err);
    });
  }



  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle="Test Page"/>
    }>
      <Group style={{display: "block"}}>
        <Center h={"90vh"}>
          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="column"
            wrap="wrap" 
            style={{margin:"30px"}}>
            
            {response ? (
              <CodeHighlight style={{fontSize: 25, fontWeight: 600, maxWidth:"80vw"}} code={ JSON.stringify(response, null, 2) } language="json" />
            ) : (
              <Loader />
            )}
            <Button onClick={getAPIData}>
              Refetch data from backend
            </Button>
            <Stack>
              <Code>Env: {process.env.NODE_ENV}</Code>
            </Stack>



          </Flex>
        </Center>
      </Group>
    </InnerHeader>
  );
}