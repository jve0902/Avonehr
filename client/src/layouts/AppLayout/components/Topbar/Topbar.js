import React from "react";

import { Grid, Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";

import Logo from "../../../../assets/img/Logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    padding: "20px 0",
  },
  flexGrow: {
    flexGrow: 1,
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title: {
    display: "none",
    letterSpacing: "0.1em",
    fontWeight: 700,
    fontSize: "18px",
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a": {
      color: theme.palette.white,
      textDecoration: "none",
    },
  },
  navs: {
    display: "block",
  },
  link: {
    color: "#ffffff",
    padding: "10px 10px",
    textDecoration: "none",
  },
  patientLink: {
    color: "#ffffff",
    padding: "10px 10px",
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
  grow: {
    flexGrow: 0,
  },
  headerWithSearchBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  name: {
    marginRight: theme.spacing(2),
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  date: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  loginButton: {
    minHeight: 47,
    maxWidth: 75,
    background: "#335eea",
    fontWeight: 600,
    lineHeight: 1.6,
  },
  navLink: {
    color: "#506690",
    textDecoration: "none",
    padding: ".5rem 1rem",
    fontSize: 17,
    fontWeight: 500,

    "&:hover": {
      color: "#335eea",
    },
  },
  container: {
    maxWidth: "1040px",
  },
}));


const Topbar = (props) => {
  const {
    className, onSidebarOpen, ...rest
  } = props;

  const classes = useStyles();

  return (
    <AppBar color="transparent" {...rest} className={clsx(classes.root, className)}>
      <Container maxWidth="lg" className={classes.container}>
        <Toolbar className={classes.toolbar} disableGutters>
          <RouterLink to="/dashboard">
            <img src={Logo} alt="Logo" />
          </RouterLink>
          <Hidden mdDown>
            <Grid className={classes.linksContainer}>
              <RouterLink to="/" className={classes.navLink}>
                Home
              </RouterLink>
              <RouterLink to="/resources" className={classes.navLink}>
                Resources
              </RouterLink>
              <RouterLink to="/catalog" className={classes.navLink}>
                Catalog
              </RouterLink>
              <RouterLink to="/about" className={classes.navLink}>
                About
              </RouterLink>
              <RouterLink to="/contact" className={classes.navLink}>
                Contact
              </RouterLink>
            </Grid>
            <Button
              className={classes.loginButton}
              size="large"
              variant="contained"
              color="primary"
              disableElevation
            >
              Login
            </Button>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Topbar.defaultProps = {
  className: null,
  onSidebarOpen: () => { },
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
