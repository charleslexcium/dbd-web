import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {keycloak.authenticated ? (
        <>
          <h1>Welcome, {keycloak.tokenParsed?.preferred_username}</h1>
          <button type="button" onClick={() => keycloak.logout()}>Logout</button>
        </>
      ) : (
        <button type="button" onClick={() => keycloak.login()}>Login</button>
      )}
    </div>
  );
}

export default App;
