import React from 'react';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import {colorsTuple, createTheme, localStorageColorSchemeManager, MantineProvider } from '@mantine/core';

const theme = createTheme({
  primaryColor : 'cyan',
  primaryShade: 5,
  autoContrast: true,
  colors: {
    //                                                                                           Outline            Default-hover    Default (big-sidebar)   Body            ?                ?
    dark: ['RGB(220, 220, 220)', 'RGB(185, 185, 185)', 'RGB(160, 160, 160)', 'RGB(60, 60, 60)', 'RGB(45, 45, 45)', 'RGB(45, 45, 45)', 'RGB(33, 33, 36)',    'RGB(15, 15, 17)', 'RGB(5, 5, 5)', 'RGB(0, 0, 0)'],
    puple: colorsTuple('#ED245D'),
    // smallbar: virtualColor({
    //   name: 'smallbar',
    //   dark: 'pink',
    //   light: 'cyan',
    // }),
  },
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'color-scheme',
});

export default function MantineFunctions({ children }: { children: React.ReactNode }) {
  return (
      <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme='dark'>
        {children}
      </MantineProvider>
  );
}