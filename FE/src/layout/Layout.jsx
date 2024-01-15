import { Stack } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import DashbourdSidebar from "./DashboardSidebar";
import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const rootPath = location.pathname.split("/")[1];
  

  return (
    <div >
      {/* <Navbar/> */}
      <Stack flexDirection="row" sx={{}}>
        {rootPath === "dashboard" ? <DashbourdSidebar /> : <></>}
        <main style={{ flex: 1 }}>{children}</main>
      </Stack>
      <Footer />
    </div>
  );
};

export default Layout;
