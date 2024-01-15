import React, { useContext } from "react";
import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ButtonBase,
  Button,
  Container,
} from "@mui/material";
import theme from "../theme/theme";
import Logo from "../components/Logo.jpg";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../contexts/Auth/AuthContext";

export default function Navbar(props) {
  const { pathname } = useLocation();
  const { authState, logoutUser } = useContext(AuthContext);
  const navStyles = {
    listText: {
      fontSize: "16px",
      textTransform: "uppercase",
      fontWeight: "600",
      color: "#fff",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },

    listItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      textAlign: "center",
      color: "#FFFFFF",
    },

    btn: {
      height: "30px",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      fontSize: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  };

  const listItems = [
    { item: "Home", link: "/" },
    { item: "Cities", link: "/CitiesPage" },
    { item: "Guides", link: "/GuiedsPage" },
    { item: "Contacts", link: "/ContactsPage" },
    { item: "About", link: "/Abotus" },
    {item:"Culture", link:"/Culture"}
  ];

  const newNavItems = listItems.map((newNavItem, index) => (
    <ListItem key={index} sx={navStyles.listItem}>
      <ListItemButton
        to={newNavItem.link}
        sx={navStyles.listText}
        component={Link}
      >
        {newNavItem.item}
      </ListItemButton>
    </ListItem>
  ));

  return (
    // <Container>
    <Stack
      height="100px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p="0 100px"
      bgcolor={props.color}
      position="sticky"
    >
      <ButtonBase
        disableRipple
        href="/"
        sx={{
          height: "100%",
          width: "90px",
          background: `url(${Logo})`,
          backgroundSize: "cover",
          border: "none",
          borderRadius: 0,
        }}
      ></ButtonBase>

      <Box display="flex" alignItems="center">
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          {newNavItems}
          {authState?.userType === "admin" ? (
            <ListItem sx={navStyles.listItem}>
              <ListItemButton
                to="/dashboard/cities"
                sx={navStyles.listText}
                component={Link}
              >
                dashboard
              </ListItemButton>
            </ListItem>
          ) : (
            <></>
          )}
          {authState?.userType === "tourist" ? (
            <ListItem sx={navStyles.listItem}>
              <ListItemButton
                to="/tourist"
                sx={navStyles.listText}
                component={Link}
                disableRipple
              >
                profile
              </ListItemButton>
            </ListItem>
          ) : (
            <></>
          )}
          {authState?.userType === "guide" ? (
            <ListItem sx={navStyles.listItem}>
              <ListItemButton
                to="/guide"
                sx={navStyles.listText}
                component={Link}
                disableRipple
              >
                profile
              </ListItemButton>
            </ListItem>
          ) : (
            <></>
          )}
        </List>
        {authState ? (
          <Button href="/Login" sx={navStyles.btn} onClick={logoutUser}>
            logout
          </Button>
        ) : (
          <Box display="flex" gap="5px">
            <Button href="/Login" sx={navStyles.btn}>
              Login
            </Button>
            <Button href="/SignUp" sx={navStyles.btn}>
              Sign UP
            </Button>
          </Box>
        )}
      </Box>
    </Stack>
    // </Container>
  );
}
