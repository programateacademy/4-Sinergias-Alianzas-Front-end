// dependencies
import React from "react";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children, isAdminOrUser, setIsAdminOrUse }) => {
  return (
    <>
      <Header isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
