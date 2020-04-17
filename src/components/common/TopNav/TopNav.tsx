import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Grid, Link, IconButton, Menu, MenuItem, Avatar
} from "@material-ui/core";
import auth from "../../../auth/auth";
import { getUserProfile, UserProfile } from "../../../clients/publicApiClient";
import { AccountCircle } from "@material-ui/icons";

export const TopNav: React.FC = () => {
  const [userProfile, setState] = useState({} as UserProfile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {
          (auth.isAuthenticated()) ?
            (<Button color={"inherit"} onClick={() => auth.logout()}>Sair</Button>) :
            (<Button color={"inherit"} onClick={() => auth.login()}>Entrar</Button>)
        }
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid
            justify="space-between"
            container
            spacing={10}
          >
            <Grid item style={{marginTop: "10px"}}>
              <Typography  variant="h4" component="span">
                <Link href="/" color={"textSecondary"}>4holder</Link>
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
      {renderMenu}
    </div>
  );
};