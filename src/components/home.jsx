import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

function Home() {
  // eslint-disable-next-line
  const { keycloak, initialized } = useKeycloak();

  return (
    <div className="hover:text-gray-200">
      {!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800"
          onClick={() => keycloak.login({
            redirectUri: `${process.env.REACT_APP_URL}/register`,
          })}
        >
          Login
        </button>
      )}

      {keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800"
          onClick={() => keycloak.logout()}
        >
          Logout ({keycloak.tokenParsed.preferred_username})
        </button>
      )}
    </div>
  );
}

export default Home;
