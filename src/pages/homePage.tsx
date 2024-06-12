import React, { useContext } from 'react';
import { Group, Center, Title } from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';

import { UserContext } from '../util/providers/userContext';

export default function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle="Home"/>
    }>
      <Group style={{display: "block"}}>
        <Center h={"80vh"}>
          { user &&
            <>
              <Title order={1}>Welcome {user.nickname}!</Title>
            </>
          }
        </Center>
      </Group>
    </InnerHeader>
  );
}