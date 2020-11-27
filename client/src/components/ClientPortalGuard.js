import React from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ClientPortalGuard = ({ children }) => {
  const { isAuthenticated, user, login_url } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={login_url || "/login_client"} />;
  }

  if (user.role !== "PATIENT") {
    return <Redirect to="/protected-area" />;
  }

  return (
    <>
      {children}
    </>
  );
};

ClientPortalGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientPortalGuard;
