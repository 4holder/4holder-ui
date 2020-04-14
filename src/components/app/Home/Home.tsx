import React from 'react';
import { RouteComponentProps } from '@reach/router';
import auth from '../../../auth/auth';

const Home: React.FC<RouteComponentProps> = () => {
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

      <button className="btn btn-info log" onClick={() => auth.login()}>Área do cliente!</button>
    </div>
  );
};

export default Home;