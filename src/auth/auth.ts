import auth0, {Auth0DecodedHash} from 'auth0-js';
import config from "../config";

interface TokenInfo {
  idToken: string;
  expiresIn: number;
}

class Auth {
  private auth0: auth0.WebAuth;

  constructor() {
    this.auth0 = new auth0.WebAuth(config.auth0);

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
      expiresIn: expiresIn,
    } as TokenInfo;

    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
  }

  getToken() {
    const token = localStorage.getItem('tokenInfo');

    if(!token) {
      return null;
    }

    const tokenInfo: TokenInfo = JSON.parse(token);

    return tokenInfo.idToken;
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
      returnTo: config.dashboardUrl,
      clientID: config.auth0.clientID,
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