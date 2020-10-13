import React from "react";

import { Divider, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import clsx from "clsx";
import PropTypes from "prop-types";

import { SidebarNav, GeneralSidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 65,
      height: "calc(100% - 65px)"
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = (props) => {
  const { open, variant, onClose, isAuth, logout, className, ...rest } = props;

  const classes = useStyles();

  const pages = [];

  const publicPages = [
    {
      title: "Login",
      href: "/login_client",
      icon: <LockIcon />
    },
    {
      title: "Signup",
      href: "/signup_client",
      icon: <LockOpenIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        {!isAuth && (
          <React.Fragment>
            <Divider className={classes.divider} />
            <GeneralSidebarNav className={classes.nav} pages={publicPages} />
          </React.Fragment>
        )}
        <Divider className={classes.divider} />
        {isAuth && <SidebarNav className={classes.nav} pages={pages} />}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
