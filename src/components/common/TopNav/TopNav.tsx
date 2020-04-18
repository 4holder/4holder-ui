import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Link,
  IconButton,
  MenuItem,
  Avatar,
  Theme,
  createStyles,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Divider
} from "@material-ui/core";
import auth from "../../../auth/auth";
import { getUserProfile, UserProfile } from "../../../clients/publicApiClient";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    loadinText: {
      marginRight: theme.spacing(2),
    },
  }),
);

export const TopNav: React.FC = () => {
  const classes = useStyles();
  const [userProfile, setState] = useState({} as UserProfile);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  useEffect( () => {
    if(auth.isAuthenticated()) {
      getUserProfile()
        .then(userProfile => setState(userProfile))
        .catch(e => {
          const { code } = e.graphQLErrors[0].extensions;

          if(code === "INVALID_TOKEN") {
            auth.logout();
          }

          console.log(e);
        });
    }
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Grid
            justify="space-between"
            container
            spacing={10}
          >
            <Grid item style={{marginTop: "15px"}}>
              <Typography  variant="h5" component="span">
                <Link underline={'none'} href="/" color={"textSecondary"}>4HOLDER</Link>
              </Typography>
            </Grid>

            <Grid item>
              <div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <Avatar aria-label="recipe">
                    {
                      (auth.isAuthenticated() && userProfile) ?
                        (<img src={userProfile.picture} height={40} alt={""}/>) :
                        (<AccountCircle />)
                    }
                  </Avatar>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Popper open={isMenuOpen} anchorEl={anchorEl} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList autoFocusItem={isMenuOpen} id="menu-list-grow">
                  {
                    (auth.isAuthenticated() && userProfile) ?
                      (
                        <div>
                          <MenuItem>
                            <Typography variant={"subtitle2"} color={"textSecondary"}>
                              {userProfile.firstName} <br />
                              {userProfile.email}
                            </Typography>
                          </MenuItem>
                          <Divider />
                        </div>
                      ) : null
                  }

                  <MenuItem onClick={handleMenuClose}>
                    {
                      (auth.isAuthenticated()) ?
                        (<Button color={"inherit"} onClick={() => auth.logout()}>Sair</Button>) :
                        (<Button color={"inherit"} onClick={() => auth.login()}>Entrar</Button>)
                    }
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};