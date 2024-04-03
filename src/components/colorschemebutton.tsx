import React from 'react';
import { ActionIcon, useMantineColorScheme  } from '@mantine/core';
import GoogleIcon from './googleIcon';

export default function ColorSchemeButton() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant="default" size="lg" onClick={() => {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }}>
      { colorScheme === 'light' ?
        // <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} /> :
        // <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
        <GoogleIcon icon="dark_mode" size={20} color={"var(--mantine-color-text)"} /> :
        <GoogleIcon icon="light_mode"  size={20} color={"var(--mantine-color-text)"} />
      }
    </ActionIcon>
  )
}