import { Stack, Title, Divider, Button, Group, Modal} from '@mantine/core';
import InnerHeader from '../components/shell/innerHeader';
import { useAuth0 } from "@auth0/auth0-react";
import DefaultInnerHeaderContent from '../components/shell/defaultInnerHeaderContent';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { UserContext } from '../util/providers/userContext';

export default function SettingsPage() {
  const { logout } = useAuth0();
  const [opened, { open, close }] = useDisclosure(false);
  const { deleteAllUserData } = useContext(UserContext);

  return (
    <InnerHeader content={
      <DefaultInnerHeaderContent pageTitle="Settings"/>
    }>
      <div style={{padding: "40px"}}>
        <Modal opened={opened} onClose={close} title="Are you sure?" size="auto" >
          <Stack gap='md' w={'500px'} >
            Are you sure you want to delete your account, this includes all your user data (chat messages, user settings, etc.), this action is irreversible.
            <Group>
              <Button variant='light' onClick={close}>No, keep user data</Button>
              <div style={{flexGrow:1}}></div>
              <Button  color='red' onClick={deleteAllUserData}>Yes, delete all user data</Button>
            </Group>
          </Stack>
        </Modal>
        <Stack>
          <Title order={1}>{/*Profile settings*/}User and privacy Settings</Title>
          <Divider/>
          {/* <Input label="Username" placeholder="Username"/> */}
          <Group>
            <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
            <Button color='red' onClick={open}>Delete account</Button>
          </Group>

          {/* <Title order={2}>Privacy</Title>
          <Divider/>
          <Group>
          </Group>
          <Text>Under construction....</Text> */}
        </Stack>
        
      </div>
    </InnerHeader>
  );
}