import React from 'react';
import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
 const { keycloak, _ } = useKeycloak();

 return keycloak.authenticated ? children : <><div>nothing here, user is not authenticated</div></>;
};

export default PrivateRoute;