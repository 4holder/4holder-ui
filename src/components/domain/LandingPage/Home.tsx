import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Card, CardContent, createStyles, Divider, Grid, Link, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import coverBackground from "../../../images/cover-background.jpg";
import {TopNav} from "./TopNav";

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
  },
  cardGrid: {
    padding: 40,
  },
  cardRoot: {
    minWidth: 275,
    minHeight: 160,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  bottomMenu: {
    textAlign: "center",
    padding: 10,
  },
}));

const Home: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <Grid container justify={"center"}>
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
            All of this is about enable you to continuously improve your finances, investments goals and strategy
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={4} className={classes.cardGrid}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  For small investors
                </Typography>
                <Typography variant="h5" component="h2">
                  Straightforward
                </Typography>
                <Typography variant="body2" component="p" align={"justify"}>
                  Connect a monthly based income with investments
                  helping to improve the financial efficiency.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} className={classes.cardGrid}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Visibility on your earning
                </Typography>
                <Typography variant="h5" component="h2">
                  Incomes Management
                </Typography>
                <Typography variant="body2" component="p" align={"justify"}>
                  Have visibility of your incomes and the discounts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} className={classes.cardGrid}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Control of your expenses
                </Typography>
                <Typography variant="h5" component="h2">
                  Expense Management
                </Typography>
                <Typography variant="body2" component="p" align={"justify"}>
                  Plan your expense and remove what is unnecessary. Have visibility
                  on near months.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} className={classes.cardGrid}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Set objectives for your investments
                </Typography>
                <Typography variant="h5" component="h2">
                  Investments Goals
                </Typography>
                <Typography variant="body2" component="p">
                  Tools to set goals and based on Net Patrimony or Dividends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} className={classes.cardGrid}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Plan your portfolio
                </Typography>
                <Typography variant="h5" component="h2">
                  Diversification
                </Typography>
                <Typography variant="body2" component="p">
                  Charts and benchmarks to support a good portfolio planning.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12} className={classes.bottomMenu}>
        Copyright © 2020 4Holder | <Link href="https://github.com/4holder" target="_blank">Github</Link>
      </Grid>
    </Grid>
  );
};

export default Home;