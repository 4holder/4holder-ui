import React, {useEffect, useState} from 'react';
import auth from '../../../auth/auth';
import { Redirect, RouteComponentProps } from "@reach/router";
import { importAuth0User } from "../../../clients/publicApiClient";

const Callback: React.FC<RouteComponentProps> = () => {
  const [isLoggedIng, setState] = useState(false);

  useEffect(() => {
    auth
      .handleAuthentication()
      .then(async (_) => {
        await importAuth0User();
        setState(true);
      })
      .catch(e => console.log(`Error dealing with auth0 ${JSON.stringify(e)}`));
  }, []);

  if(isLoggedIng){
    return <Redirect to='/dashboard' noThrow={true} />;
  }

  return (
    <h1>Espere um pouco, carregando ..</h1>
  );
};

export default Callback;
