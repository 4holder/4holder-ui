import React from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import auth from '../../../auth/auth';


const Home: React.FC<RouteComponentProps> = () => {
  const logout = () => {
    auth.logout();
    return (<Redirect to={`/`} noThrow />);
  };

  return (
    <div style={
      {
        textAlign: "center"
      }
    }>
      <h1>
        Olá, seja bem vindo!
      </h1>

      <br />
      <hr />
      <br />

      {
        <a href="#" className="btn btn-info log" onClick={() => auth.login()}>Área do cliente</a>
      }
    </div>
  );
};

export default Home;