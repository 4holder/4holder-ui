import auth0, {Auth0DecodedHash} from 'auth0-js';
import moment from 'moment';

const { env } = process;

interface WebAuthOptions {
  domain: string;
  clientID: string;
  redirectUri: string;
  audience: string;
  responseType: string;
  scope: string;
}

interface TokenInfo {
  idToken: string;
  expiresIn: number;
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

  async handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash({ hash: window.location.hash },
        (err, authResult: Auth0DecodedHash | null) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult.idToken, authResult.expiresIn);
          return resolve();
        }

        return reject(err);
      });
    });
  }

  setSession(idToken: string, expiresIn?: number) {
    const tokenInfo = {
      idToken,
      expiresAt: expiresIn,
    };

    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
  }

  isAuthenticated() {
    const item = localStorage.getItem('tokenInfo') || '';

    if(!item) {
      return false;
    }
    const tokenInfo: TokenInfo = JSON.parse(item);

    return !!tokenInfo.idToken;
  }

  logout() {
    localStorage.removeItem('tokenInfo');
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
}

const auth = new Auth();

export default auth;