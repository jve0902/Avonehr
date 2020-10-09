import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import Container from "@material-ui/core/Container";
import { Topbar, Sidebar, Footer } from "./../components";
import { AuthConsumer } from "./../../../providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50
    }
  },
  shiftContent: {
    paddingLeft: 0
  },
  content: {
    height: "100%"
  }
}));

const WithLeftSidebar = (props) => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <AuthConsumer>
      {({ isAuth, logout, user }) => (
        <div
          className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
          })}
        >
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            logout={logout}
            user={user}
          />
          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? "persistent" : "temporary"}
            isAuth={isAuth}
            logout={logout}
            user={user}
          />

          <Container maxWidth="xl" style={{ flex: 1 }}>
            {children}
          </Container>
          <Footer />
        </div>
      )}
    </AuthConsumer>
  );
};

export default WithLeftSidebar;
