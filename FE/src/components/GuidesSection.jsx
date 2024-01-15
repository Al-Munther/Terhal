import React, { useContext, useEffect } from "react";

import Section from "./section/Section";
import ExtractBtn from "./ExtractBtn";
import { Card, CardContent, CardMedia, Stack, Typography, Box } from "@mui/material";
import img1 from './GuidesImages/Untitled.png'
import theme from "../theme/theme";
import { guidesContext } from "../contexts/GuidesContext";
import useHttpRequest from "../hooks/useHttpRequest";

const BaseURL = "http://localhost:5000/";

export default function GuiedsSection(){
    const { guides, setGuides } = useContext(guidesContext);

    const Guides = [
        {Name:'Saleh Wifar',City:"Sana'a", Price:50,langs:['AR','EN'], img:img1, link:''},
        {Name:"Saleh Wifar",City:"Sana'a",Price:50,langs:['AR','EN'], img:img1, link:''},
        {Name:'Saleh Wifar',City:"Sana'a",Price:50,langs:['AR','EN'], img:img1, link:''}]

    const { sendRequest, status, error } = useHttpRequest();
     useEffect(() => {
       if (guides.length === 0) {
         sendRequest({ url: "api/guides" }, (data) => setGuides(data.guides));
       }
     }, [guides, setGuides, sendRequest]);

     if (status === "failed") {
       return <>Error</>;
     }    

     
     const newguieds = guides.slice(0,3)
   

    return (
      <Section header="Guides" subTitle="Check our Trip Guieds">
        <Stack width="100%" direction="row" justifyContent="space-evenly" flexWrap='wrap' gap='10px'>
          {status === "loading" ? (
            <></>
          ) : (
            newguieds?.map((item, index) => (
              <Card
                key={index}
                sx={{
                  height: "420px",
                  width: "300px",
                  border: "none",
                  borderRadius: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia sx={{ height: "65%" }} image={BaseURL+item.image} />
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
            ))
          )}
        </Stack>
        <ExtractBtn link="/GuiedsPage" text="More Guides" />
      </Section>
    );
}