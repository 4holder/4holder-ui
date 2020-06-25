import React from 'react';
import { RouteComponentProps } from '@reach/router';
import {createStyles, Grid, Link, Theme, Typography} from "@material-ui/core";
import {TopNav} from "../../common/TopNav/TopNav";
import {makeStyles} from "@material-ui/core/styles";
import coverBackground from "../../../images/cover-background.jpg";

const useStyles = makeStyles((theme: Theme) => createStyles({
  cover: {
    height: 500,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "0px !important",
  },
  coverContent: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.4)",
    padding: 20,
    color: "#fff",
    fontWeight: 900,
    border: "3px solid #f1f1f1",
  },
  coverBackground: {
    backgroundImage:`url(${coverBackground})` ,
    filter: "blur(5px)",
    "-webkit-filter": "blur(5px)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  }
}));

const Home: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <Grid container justify={"center"} spacing={10}>
      <Grid item xs={12}>
        <TopNav />
      </Grid>
      <Grid item xs={12} className={classes.cover}>
        <div className={classes.coverBackground} />
        <div className={classes.coverContent}>
          <Typography variant="h4" component="span" style={{fontFamily: '"PT Serif Caption", sans-serif'}}>
            <b>4holder</b>, tools for long term investors
          </Typography>
          <br />
          <Typography variant="overline" component="span">
            All of this is about enable you to continuously improve on your finances, investments goals and strategy
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Link href="/dashboard">Dashboard</Link>
      </Grid>
    </Grid>
  );
};

export default Home;