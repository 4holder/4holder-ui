import React, {useEffect, useState} from 'react';
import { Redirect, RouteComponentProps } from "@reach/router";
import { CircularProgress, createStyles, Grid, Theme, Typography } from "@material-ui/core";

import { importAuth0User } from "../../../clients/publicApiClient";
import auth from '../../../auth/auth';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingText: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


const Callback: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const [isLoggedIng, setState] = useState(false);

  useEffect(() => {
    auth
      .handleAuthentication()
      .then(async (_) => {
        await importAuth0User();
        setState(true);
      })
      .catch(e => {
        auth.clearSession();
        console.log(`Error dealing with auth0 ${JSON.stringify(e)}`)
      });
  }, []);

  if(isLoggedIng){
    return <Redirect to='/dashboard' noThrow={true} />;
  }

  return (
    <div>
      <Grid
        justify={"center"}
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography className={classes.loadingText} variant={"h6"}>Espere um pouco, carregando ..</Typography>
        </Grid>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
);
};

export default Callback;

