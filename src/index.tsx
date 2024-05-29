import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import MantineFunctions from './util/mantineFunctions';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContextProvider } from './util/providers/userContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <MantineFunctions>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
          authorizationParams={{
            redirect_uri: window.location.origin,
            // audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN as string}/api/v2/`,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'pixelchat-gateway-identifier',
            scope: "read:current_user update:current_user_metadata read:users",
            // prompt: "consent"
          }}>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </Auth0Provider>
    </MantineFunctions>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
