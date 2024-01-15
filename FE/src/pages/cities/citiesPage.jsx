import React, { useContext, useEffect } from "react";
import Navbar from "../../layout/NavBar";
import Section from "../../components/section/Section";
import ExtractBtn from "../../components/ExtractBtn";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";

import CitiesData from "./index";
import theme from "../../theme/theme";
import { citiesContext } from "../../contexts/CitiesContext";
import useHttpRequest from "../../hooks/useHttpRequest";
import { useNavigate } from "react-router-dom";
const BaseURL = "http://localhost:5000/";

export default function CitiesPage() {
  const { cities, setCities } = useContext(citiesContext);
  const navigate = useNavigate();

  const { sendRequest, status, error } = useHttpRequest();

  useEffect(() => {
    if (cities.length === 0) {
      sendRequest({ url: "api/cities" }, (data) => setCities(data.cities));
    }
  }, [cities, setCities, sendRequest]);

  if (status === "failed") {
    return <>Error</>;
  }

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      {status === "loading" ? (
        <></>
      ) : (
        <Section header="Cieties" subTitle="Check Out Yemen's Cities">
          <Grid
            width="100%"
            display="grid"
            direction={"row"}
            gridTemplateColumns="1fr 1fr"
            gap="70px"
            p="0 70px"
          >
            {cities.map((item) => (
              <Box
                sx={{
                  height: "300px",
                  width: "100%",
                  background: `url(${BaseURL+item.image})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  sx={{
                    height: "50px",
                    backgroundColor: "#1E1E1EB2",
                    color: "#fff",
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    pl: "20px",
                  }}
                  onClick={() => navigate(`/cities/${item.id}`)}
                >
                  <Typography variant="h6" textAlign="left" color="#fff">
                    {item.name}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Grid>
          
        </Section>
      )}
    </Stack>
  );
}
