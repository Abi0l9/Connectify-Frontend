import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Routes";

function Layout() {
  return (
    <div>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default Layout;
