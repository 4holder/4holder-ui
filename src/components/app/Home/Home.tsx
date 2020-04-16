import React from 'react';
import { RouteComponentProps } from '@reach/router';
import auth from '../../../auth/auth';
import { TopNav } from "../../common/TopNav/TopNav";
import {Grid, Typography} from "@material-ui/core";

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <Grid
        container
        direction="column-reverse"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>
          <TopNav />
        </Grid>

        <Grid item style={{
          marginTop: "76px",
          textAlign: 'center',
        }}>
          <Typography variant="h3" component="span">
            Olá, seja bem vindo!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;