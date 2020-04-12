import React, {useEffect, useState} from 'react';
import auth from '../../../auth/auth';
import {Redirect, RouteComponentProps} from "@reach/router";
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

const Callback: React.FC<RouteComponentProps> = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    auth
      .handleAuthentication()
      .then(_ => setState(true))
      .catch(e => console.log(`Error dealing with auth0 ${JSON.stringify(e)}`));
  }, []);

  if(state){
    return <Redirect to='/dashboard' noThrow={true} />;
  }

  return (
    <h1>Loading ..</h1>
  );
};

export default Callback;
