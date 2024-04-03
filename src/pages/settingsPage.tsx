import { Center, Stack, Title, Divider, Button, Group } from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import { useAuth0 } from "@auth0/auth0-react";

export default function SettingsPage() {
  const { logout } = useAuth0();

  return (
    <InnerHeader content={
      <Center h={"100%"} w={"fit-content"}>
        <Title order={2}>Settings</Title>
      </Center>
    }>
      <div style={{padding: "40px"}}>
        <Stack>
          <Title order={1}>{/*Profile settings*/}TODO</Title>
          <Divider/>
          {/* <Input label="Username" placeholder="Username"/> */}
          <Group>
            <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
          </Group>
        </Stack>
      </div>
    </InnerHeader>
  );
}