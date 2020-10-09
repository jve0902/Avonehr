import React from "react";
import clsx from "clsx";
import { NavLink as RouterLink } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none"
  }
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, logout, user, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}></Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
