import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Icon from "@mdi/react";
import { mdiChartBox, mdiAccount, mdiAccountSupervisor } from "@mdi/js";
import { Profile, SidebarNav, SearchBar } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const { open, variant, isAuth, logout, onClose, className, ...rest } = props;
  const classes = useStyles();

  const pages = [
    {
      title: "Home",
      href: "/dashboard/appoinment-types",
      icon: (
        <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Manage",
      href: "/dashboard/manage",
      icon: (
        <Icon
          path={mdiAccountSupervisor}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      ),
    },
    {
      title: "Setup",
      href: "/dashboard/setup",
      icon: <SettingsIcon />,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: (
        <Icon path={mdiChartBox} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Myself",
      href: "/dashboard/typography",
      icon: (
        <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />
      ),
    },
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
        <Profile isAuth={isAuth} logout={logout} />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
        <SearchBar />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
