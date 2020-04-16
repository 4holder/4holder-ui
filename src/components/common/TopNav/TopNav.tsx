import React from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Grid
} from "@material-ui/core";
import auth from "../../../auth/auth";

export const TopNav: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Grid
          justify="space-between"
          container
          spacing={10}
        >
          <Grid item>
            <Typography variant="h6" component="span">
              4holder
            </Typography>
          </Grid>

          <Grid item>
            {
              (auth.isAuthenticated()) ?
                (<Button color={"inherit"} onClick={() => auth.logout()}>Sair</Button>) :
                (<Button color={"inherit"} onClick={() => auth.login()}>Entrar</Button>)
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};