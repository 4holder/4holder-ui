import React from "react";
import {AppBar, createStyles, Grid, Link, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import auth from "../../../auth/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      display: 'flex',
    },
    signInLink: {
      color: "#fff",
      paddingTop: 30,
    },
    logoLink: {
      color: "#fff",
    }
  }),
);

export const TopNav: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.cardRoot}>
      <AppBar>
        <Toolbar>
          <Grid
            justify={"space-between"}
            container
          >
            <Grid item>
              <Typography variant="h6" component="span">
                <Link underline={'none'} className={classes.logoLink} href="/">4HOLDER</Link>
              </Typography>
            </Grid>

            <Grid item>
              <Link
                href="#login"
                underline={'none'}
                className={classes.signInLink}
                onClick={() => {
                    auth.login()
                }}
              >
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};