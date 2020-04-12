import auth0 from 'auth0-js';

const { env } = process;

interface WebAuthOptions {
  domain: string;
  clientID: string;
  redirectUri: string;
  audience: string;
  responseType: string;
  scope: string;
}

const webAuthOptions = {
  domain: env.REACT_APP_AUTH0_DOMAIN,
  clientID: env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: env.REACT_APP_AUTH0_CALLBACK_URL,
  audience: env.REACT_APP_AUTH0_AUDIENCE,
  responseType: 'token id_token',
  scope: 'openid email'
} as WebAuthOptions;

const loginUrl = env.REACT_APP_LOGIN_URL || 'http://localhost:3000';

class Auth {
  private auth0: auth0.WebAuth;
  private idToken: string = "";
  private expiresAt: any;

  constructor() {
    this.auth0 = new auth0.WebAuth(webAuthOptions);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash({ hash: window.location.hash },(err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      }

      throw err;
    });
  }

  setSession(authResult: any) {
    this.idToken = authResult.idToken;

    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout() {
    this.auth0.logout({
      returnTo: loginUrl,
      clientID: webAuthOptions.clientID,
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }
}

const auth = new Auth();

export default auth;