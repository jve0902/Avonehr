import React from "react";
import Container from "@material-ui/core/Container";
import Footer from "./../../components/Footer";

const PatientPortal = ({ children }) => {
  return (
    <div className="main-container">
      <Container maxWidth="lg">{children}</Container>
      <Footer />
    </div>
  );
};

export default PatientPortal;
