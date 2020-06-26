import React from 'react';
import { RouteComponentProps } from '@reach/router';
import {createStyles, Theme} from "@material-ui/core";
import NavDrawer from "../Drawer/Drawer";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      display: 'flex',
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const Skeleton: React.FC<RouteComponentProps> = ({
   children,
 }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.cardRoot}>
      <NavDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography>
          {children}
        </Typography>
      </main>
    </div>
  );
};

export default Skeleton;