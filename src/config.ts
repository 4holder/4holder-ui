import { AuthOptions } from "auth0-js";

type Config = {
  dashboardUrl: string;
  apiUrl: string;
  auth0: AuthOptions;
}

const config: Config = {
  dashboardUrl: process.env.REACT_APP_DASHBOARD_URL || "http://localhost:8080/dashboard",
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3000/",
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || "http://localhost:8080/",
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || "create_an_.env_file",
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid email'
  }
};

export default config;
