import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

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


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme='dark'> 
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
