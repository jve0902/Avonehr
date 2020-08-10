import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import { connect } from "react-redux";

import { colors } from "@material-ui/core";
import { AuthConsumer } from "./../../../providers/AuthProvider";

import { logOut } from "./../../../store/auth/actions";
import Logo from "./../../../assets/img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: theme.palette.white,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "& button": {
      color: colors.orange[800],
      backgroundColor: colors.grey[200],
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  link: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    fontSize: "16px",
  },
}));

const Topbar = ({ dispatch, ...props }) => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();

  const handleLogout = (_e, authProviderLogOut) => {
    dispatch(logOut());
    authProviderLogOut();
  };
  return (
    <AuthConsumer>
      {({ logout }) => (
        <AppBar {...rest} className={clsx(classes.root, className)}>
          <Toolbar>
            <RouterLink to="/">
              <img alt="Logo" src={Logo} />
            </RouterLink>
            <div className={classes.flexGrow} />
            <Hidden mdDown>
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={(event) => handleLogout(event, logout)}
              >
                <InputIcon />
              </IconButton>
            </Hidden>

            <Hidden lgUp>
              <IconButton color="inherit" onClick={onSidebarOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      )}
    </AuthConsumer>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default connect()(Topbar);
