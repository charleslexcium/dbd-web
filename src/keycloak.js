import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:80",
  realm: "dbd",
  clientId: "dbd",
});

export default keycloak;
