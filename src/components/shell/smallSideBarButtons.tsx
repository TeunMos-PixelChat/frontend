import { ActionIcon, Center, Stack } from '@mantine/core';
import styles from './smallSideBar.module.css';
import GoogleIcon from '../googleIcon';

export default function SmallSidebarButtons({ path }: { path: string }) {

  function navigateTo(path: string) {
    window.location.pathname = path;
  }


  return (
    <Center className={styles.container}>
      <Stack>
        <SidebarButton icon="home" active={ path === '/' } onClick={() => navigateTo('/')} />
        <SidebarButton icon="search" active={ path.startsWith('/search') } onClick={() => navigateTo('/search')} />
        <SidebarButton icon="notifications" active={ path.startsWith('/notifications') } onClick={() => navigateTo('/notifications')} />
      </Stack>
    </Center>
    
  );
}

function SidebarButton({ icon, active, onClick}: { icon: string; active: boolean; onClick?: () => void }) {
  return (
    <ActionIcon variant={active ? 'default' : 'transparent'} size="lg" onClick={onClick}>
      <GoogleIcon icon={icon} size={20} color={'var(--mantine-color-text)'} />
    </ActionIcon>
  );
}
