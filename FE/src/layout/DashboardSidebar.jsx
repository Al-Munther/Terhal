import { Dashboard, DashboardOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, useTheme } from "@mui/material";


const DashbourdSidebar = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const theme = useTheme();
  const pathname = useLocation().pathname;
  // const { user } = useContext(AuthContext);

  const style = { backgroundColor: theme.palette.primary.main };
  return (
    <>
      <Sidebar>
        <Menu>
          <MenuItem>
            <IconButton onClick={() => collapseSidebar(!collapsed)}>
              <MenuIcon />
            </IconButton>
          </MenuItem>
          <MenuItem
            component={<Link to="../../dashboard/cities" />}
            style={pathname === "/dashboard/cities" ? style : {}}
          >
            cities
          </MenuItem>
          <MenuItem
            component={<Link to="../../dashboard/guides" />}
            style={pathname === "/dashboard/guides" ? style : {}}
          >
            guides
          </MenuItem>
          <MenuItem
            component={<Link to="../../dashboard/restaurants" />}
            style={pathname === "/dashboard/restaurants" ? style : {}}
          >
            restuarants
          </MenuItem>
          <MenuItem
            component={<Link to="../../dashboard/opointments" />}
            style={pathname === "/dashboard/opointments" ? style : {}}
          >
            opointments
          </MenuItem>
          <MenuItem
            component={<Link to="../../dashboard/hotels" />}
            style={pathname === "/dashboard/hotels" ? style : {}}
          >
            hotels
          </MenuItem>
          <MenuItem
            component={<Link to="../../dashboard/places" />}
            style={pathname === "/dashboard/places" ? style : {}}
          >
            places
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default DashbourdSidebar;
