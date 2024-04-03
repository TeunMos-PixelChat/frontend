import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import MantineFunctions from './util/MantineFunctions';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContextProvider } from './util/userContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <MantineFunctions>
      <UserContextProvider>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
          authorizationParams={{
            redirect_uri: window.location.origin
          }}>
          <App />
        </Auth0Provider>
      </UserContextProvider>
    </MantineFunctions>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
