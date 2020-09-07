import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Header from "./../../components/Header";
import Footer from "./../Dashboard/components/Footer";
import Sidebar from "./../../components/Sidebar";
import { AuthConsumer } from "./../../providers/AuthProvider";

const Plain = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setIsOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setIsOpenSidebar(false);
  };
  return (
    <AuthConsumer>
      {({ isAuth }) => (
        <>
          <Header onSidebarOpen={handleSidebarOpen} />
          <Sidebar
            onClose={handleSidebarClose}
            open={isOpenSidebar}
            variant={"temporary"}
            isAuth={isAuth}
          />

          <Container maxWidth="xl">{children}</Container>
          <Footer />
        </>
      )}
    </AuthConsumer>
  );
};

export default Plain;
