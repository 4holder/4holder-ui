import React from 'react';
import { RouteComponentProps } from '@reach/router';
import {Grid, Link, Typography} from "@material-ui/core";
import {TopNav} from "../../common/TopNav/TopNav";

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <Grid container justify={"center"} spacing={10}>
      <Grid item xs={12}>
        <TopNav />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="span">
          Olá, seja bem vindo!
        </Typography>
        <br />
        <hr />
        <Link href="/dashboard">Dashboard</Link>
      </Grid>
    </Grid>
  );
};

export default Home;