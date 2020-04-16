import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Skeleton from '../../common/Skeleton/Skeleton';
import { Link, Typography } from "@material-ui/core";

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <Skeleton>
      <Typography variant="h3" component="span">
        Olá, seja bem vindo!
      </Typography>
      <br />
      <hr />
      <Link href="/dashboard">Dashboard</Link>
    </Skeleton>
  );
};

export default Home;