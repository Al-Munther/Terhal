import React, { useContext, useEffect } from "react";

import Section from "./section/Section";
import ExtractBtn from "./ExtractBtn";
import { Box, Button, Grid, Typography } from "@mui/material";
import img1 from "./citiesImgs/city1.jpg";
import img2 from "./citiesImgs/city2.jpg";
import img3 from "./citiesImgs/city3.jpg";
import { citiesContext } from "../contexts/CitiesContext";
import useHttpRequest from "../hooks/useHttpRequest";
import { useNavigate } from "react-router-dom";
const BaseURL = "http://localhost:5000/";
export default function CitiesSection() {
  const { cities, setCities } = useContext(citiesContext);
  const navigate = useNavigate()
  const { sendRequest, status, error } = useHttpRequest();

  const Cities = [
    { city: "Aden", img: img1, link: "" },
    { city: "Sana'a", img: img2, link: "" },
    { city: "Dhamar", img: img3, link: "" },
  ];

  useEffect(() => {
    if (cities.length === 0) {
      sendRequest({ url: "api/cities" }, (data) => {
        setCities(data.cities);
      });
    }
  }, [sendRequest, setCities, cities]);

  const newCities = cities.slice(0,3)

  return (
    <Section header="Cieties" subTitle="Check Out Yemen's Cities">
      <Grid
        width="100%"
        display="grid"
        direction={"row"}
        gridTemplateColumns="1fr 1fr 1fr"
      >
        {status === "succeeded" ? (
          newCities?.map((item) => (
            <Box
              sx={{
                height: "300px",
                width: "100%",
                background: `url(${BaseURL + item.image})`,
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
                  borderRadius:'0'
                }}
                onClick={() => navigate(`/cities/${item.id}`)}
              >
                <Typography variant="h6" textAlign="left" color="#fff">
                  {item.name}
                </Typography>
              </Button>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Grid>
      <ExtractBtn link="/CitiesPage" text="More Cities" />
    </Section>
  );
}
