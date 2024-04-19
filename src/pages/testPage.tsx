import React, { useEffect, useContext } from 'react';
import { Group, Center, Code, Stack, Loader, Flex, Button } from '@mantine/core';
import axios from 'axios';
import { CodeHighlight } from '@mantine/code-highlight';
import InnerHeader from '../components/shell/innerHeader';
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';
import { useAuth0 } from "@auth0/auth0-react";

import { UserContext } from '../util/providers/userContext';



export default function TestPage() {
  const [response, setResponse] = React.useState<object | undefined>();
  const { getAccessTokenSilently, user } = useAuth0();
  const { fetchUser } = useContext(UserContext);

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
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
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

  async function getUserdata() {
    const userdata = await fetchUser();
    console.log(userdata);
    setResponse(userdata);
  }


  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle="Test Page"/>
    }>
      <Group style={{display: "block"}}>
        <Center h={"80vh"}>
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

            <Button variant='default' onClick={getUserdata}>
              Get user metadata
            </Button>

            <Stack>
              <Code>Env: {process.env.NODE_ENV}</Code>
              <Code>Audience: {process.env.REACT_APP_AUTH0_AUDIENCE}</Code>
              <Code>Auth domain: {process.env.REACT_APP_AUTH0_DOMAIN}</Code>
              <Code>Client ID: {process.env.REACT_APP_AUTH0_CLIENT_ID}</Code>
            </Stack>


          </Flex>
        </Center>
      </Group>
    </InnerHeader>
  );
}