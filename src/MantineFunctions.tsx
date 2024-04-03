import React from 'react';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
// import '@mantine/charts/styles.css';
import { createTheme, localStorageColorSchemeManager, MantineProvider } from '@mantine/core';

const theme = createTheme({
  primaryColor : 'cyan',
  primaryShade: 5,
  autoContrast: true,
  colors: {
    //                                                                                                              Default-hover    Default (big-sidebar)   Body            ?                ?
    dark: ['RGB(220, 220, 220)', 'RGB(185, 185, 185)', 'RGB(160, 160, 160)', 'RGB(60, 60, 60)', 'RGB(45, 45, 45)', 'RGB(45, 45, 45)', 'RGB(30, 30, 30)',    'RGB(15, 15, 15)', 'RGB(5, 5, 5)', 'RGB(0, 0, 0)'],
    puple: ['', '', '', '', '', '#ED245D', '', '', '', '']
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