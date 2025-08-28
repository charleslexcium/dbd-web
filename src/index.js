import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.scss';
import './index.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import App from './App';
import keycloak from './keycloak';

import reportWebVitals from './reportWebVitals';

const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens) => {
  console.log('onKeycloakTokens', tokens)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'login-required',
        redirectUri: `${process.env.REACT_APP_URL}/register`,
      }}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    >
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
