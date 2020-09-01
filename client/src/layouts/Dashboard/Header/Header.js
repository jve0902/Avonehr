import React from "react";
import moment from "moment";
import { NavLink as RouterLink } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";

import { useDispatch } from "react-redux";
import DropdownItems from "./DropdownItems";
import { logOut } from "./../../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 0,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& button": {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 700,
    fontSize: "18px",
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerWithNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWithSearchBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navs: {
    display: "block",
  },
  link: {
    color: "#ffffff",
    padding: "10px 15px",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  name: {
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const pages = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Manage",
    href: "/dashboard/manage",
    subMenus: [
      {
        title: "Accounting Search",
        href: "/dashboard/manage/search",
      },
      {
        title: "Email Patients",
        href: "/dashboard/manage/email-patients",
      },
      {
        title: "Fax",
        href: "/dashboard/manage/fax",
      },
      {
        title: "Merge Patient",
        href: "/dashboard/manage/merge-patient",
      },
      {
        title: "Delete Patient",
        href: "/dashboard/manage/delete-patient",
      },
      {
        title: "Patient Search",
        href: "/dashboard/manage/patient-search",
      },
      {
        title: "Support Center",
        href: "/dashboard/manage/support",
      },
    ],
  },
  {
    title: "Setup",
    href: "/dashboard/setup",
    subMenus: [
      {
        title: "Accounting Types",
        href: "/dashboard/setup/accounting-types",
      },
      {
        title: "Appointment Types",
        href: "/dashboard/setup/appointment-types",
      },
      {
        title: "Appointment Types User Assignment",
        href: "/dashboard/setup/appointment-types/user-assignment",
      },
      {
        title: "Backup",
        href: "/dashboard/setup/backup",
      },
      {
        title: "Configuration",
        href: "/dashboard/setup/configuration",
      },
      {
        title: "CPT codes",
        href: "/dashboard/setup/ctp-codes",
      },
      {
        title: "Drugs",
        href: "/dashboard/setup/drugs",
      },
      {
        title: "Forms",
        href: "/dashboard/setup/forms",
      },
      {
        title: "Handouts",
        href: "/dashboard/setup/handouts",
      },
      {
        title: "ICD codes",
        href: "/dashboard/setup/icd-codes",
      },
      {
        title: "Integrations",
        href: "/dashboard/setup/integrations",
      },
      {
        title: "Lab Ranges",
        href: "/dashboard/setup/lab-ranges",
      },
      {
        title: "Patient Portal Header",
        href: "/dashboard/setup/patient-portal-header",
      },
      {
        title: "Schedule",
        href: "/dashboard/setup/schedule",
      },
      {
        title: "Users",
        href: "/dashboard/setup/users",
      },
    ],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
  },
  {
    title: "Myself",
    href: "/dashboard/myself",
  },
  {
    title: "Logout",
    href: "/",
    logout: true,
  },
];

const Header = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onSidebarOpen, logout, user } = props;

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOut());
    logout();
    window.location.reload();
  };

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWithNav}>
            <Typography className={classes.title} variant="h6" noWrap>
              Clinios
            </Typography>
            <Hidden mdDown>
              <div className={classes.navs}>
                {pages.map((page) =>
                  page["subMenus"] ? (
                    <DropdownItems
                      parentItem={page.title}
                      menuItems={page["subMenus"]}
                      key={page.title}
                    />
                  ) : (
                    <RouterLink
                      to={page.href}
                      className={classes.link}
                      onClick={page.logout && handleLogout}
                      key={page.title}
                    >
                      {page.title}
                    </RouterLink>
                  )
                )}
              </div>
            </Hidden>
          </div>
          <Hidden mdDown>
            <div className={classes.grow} />
            <div className={classes.headerWithSearchBar}>
              <div className={classes.sectionDesktop}>
                <div className={classes.name}>
                  {user && `${user.firstname} ${user.lastname}`}
                </div>
                <div className={classes.date}>
                  {moment().format("ddd, MMM Do")}
                </div>
              </div>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
