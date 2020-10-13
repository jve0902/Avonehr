import React from "react";

import Container from "@material-ui/core/Container";

import { Footer } from "./../components";

const Plain = ({ children }) => {
  return (
    <div className="main-container">
      <Container maxWidth="lg">{children}</Container>
      <Footer />
    </div>
  );
};

export default Plain;
