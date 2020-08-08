import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import { useDispatch } from "react-redux";

import Logo from "./../../assets/img/Logo.jpg";
import { AuthConsumer } from "./../../providers/AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import { logOut } from "../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
    "& button": {
      color: colors.orange[800],
      backgroundColor: colors.grey[200],
    },
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  Logo: {
    maxWidth: "180px",
  },
  navItems: {
    listStyle: "none",
    textDecoration: "none",
    "& a": {
      textDecoration: "none",
      color: "#1d1d1d",
    },
  },
  link: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    fontSize: "16px",
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Header = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onSidebarOpen } = props;

  const handleLogout = (_e, authProviderLogOut) => {
    dispatch(logOut());
    authProviderLogOut();
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <AuthConsumer>
        {({ isAuth, logout }) => (
          <Toolbar className={classes.toolbar}>
            <RouterLink to="/">
              <img src={Logo} alt="AvonHealth" className={classes.Logo} />
            </RouterLink>
            <Hidden mdDown>
              <div className={classes.navItems}>
                {isAuth ? (
                  <React.Fragment>
                    <RouterLink
                      to="/dashboard/account"
                      className={classes.link}
                    >
                      Account
                    </RouterLink>
                    <IconButton
                      className={classes.signOutButton}
                      color="inherit"
                      onClick={(event) => handleLogout(event, logout)}
                    >
                      <InputIcon />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <RouterLink to="/about" className={classes.link}>
                      About
                    </RouterLink>
                    <RouterLink to="/library" className={classes.link}>
                      Library
                    </RouterLink>
                    <RouterLink to="/signup" className={classes.link}>
                      Sign Up
                    </RouterLink>
                    <RouterLink to="/login" className={classes.link}>
                      Login
                    </RouterLink>
                    <RouterLink to="/contact" className={classes.link}>
                      Contact
                    </RouterLink>
                  </React.Fragment>
                )}
              </div>
            </Hidden>
            <Hidden lgUp>
              <IconButton color="inherit" onClick={onSidebarOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        )}
      </AuthConsumer>
    </AppBar>
  );
};

export default Header;
