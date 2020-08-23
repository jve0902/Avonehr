import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./../../components/Sidebar";
import { AuthConsumer } from "./../../providers/AuthProvider";

const Dashboard = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <AuthConsumer>
      {({ isAuth }) => (
        <div className="main-container">
          <Header onSidebarOpen={handleSidebarOpen} />
          <Sidebar
            onClose={handleSidebarClose}
            open={openSidebar}
            variant={"temporary"}
            isAuth={isAuth}
          />

          <Container maxWidth="lg">{children}</Container>
          <Footer />
        </div>
      )}
    </AuthConsumer>
  );
};

export default Dashboard;
