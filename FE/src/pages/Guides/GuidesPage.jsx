import React, { useContext, useEffect } from "react";

import Section from "../../components/section/Section";
import Pagination from "@mui/material/Pagination";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import theme from "../../theme/theme";
import Navbar from "../../layout/NavBar";
import useHttpRequest from "../../hooks/useHttpRequest";
import { guidesContext } from "../../contexts/GuidesContext";

const BaseURL = "http://localhost:5000/";

export default function GuiedsPage() {
  const { guides, setGuides } = useContext(guidesContext);

  const { sendRequest, status, error } = useHttpRequest();

  useEffect(() => {
    if (guides.length === 0) {
      sendRequest({ url: "api/guides" }, (data) => setGuides(data.guides));
    }
  }, [guides, setGuides, sendRequest]);

  if (status === "failed") {
    return <>Error</>;
  }

  console.log(guides);

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      {status === "loading" ? (
        <></>
      ) : (
        <Section header="Guieds" subTitle="Check our Trip Guieds">
          <Stack alignItems="center" justifyContent="center" spacing={10}>
            <Grid
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr 1fr"
              gap="50px"
              p="0 70px"
              alignItems="center"
              justifyContent="center"
            >
              {guides.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    height: "450px",
                    width: "300px",
                    border: "none",
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    sx={{ height: "55%" }}
                    image={BaseURL + item.image}
                  />
                  <CardContent sx={{ height: "35%" }}>
                    <Typography
                      fontSize="28px"
                      fontWeight={600}
                      textAlign="left"
                      color={theme.palette.primary.main}
                      p="10px 0 5px 10px"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      fontSize="20px"
                      fontWeight={600}
                      textAlign="left"
                      color={theme.palette.text.primary}
                      p="0 10px 5px 10px"
                    >
                      {item.city?.name}
                    </Typography>
                    
                      <Typography
                        fontSize="16px"
                        fontWeight={400}
                        textAlign="left"
                        color={theme.palette.text.primary}
                        p="0 10px"
                      >
                        {item.description}
                      </Typography>
                      
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      p="0 10px"
                    >
                      <Box display="flex" alignItems="center" gap="5px">
                        {item.languages.map((lang, innerIndex) => (
                          <Typography
                            fontSize="16px"
                            fontWeight={400}
                            textAlign="left"
                            p="2px"
                            color="#fff"
                            bgcolor={theme.palette.text.primary}
                            key={innerIndex}
                          >
                            {lang}
                          </Typography>
                        ))}
                      </Box>

                      

                      <Typography
                        fontSize="20px"
                        fontWeight={400}
                        textAlign="left"
                        color={theme.palette.text.primary}
                        p="0 10px"
                      >
                        {item.price}$/Day
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Pagination count={5} size="large" />
          </Stack>
        </Section>
      )}
    </Stack>
  );
}
