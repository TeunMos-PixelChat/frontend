import { Stack, Title, Divider, Button, Group, Text } from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import { useAuth0 } from "@auth0/auth0-react";
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';

export default function SettingsPage() {
  const { logout } = useAuth0();

  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle="Settings"/>
    }>
      <div style={{padding: "40px"}}>
        <Stack>
          <Title order={1}>{/*Profile settings*/}User Settings</Title>
          <Divider/>
          {/* <Input label="Username" placeholder="Username"/> */}
          <Group>
            <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
          </Group>
          <Text>Under construction....</Text>
        </Stack>
      </div>
    </InnerHeader>
  );
}