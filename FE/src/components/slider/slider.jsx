import { Box, IconButton, Stack} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { Slides } from "../slider/images/data.js";

import Navbar from "../../layout/NavBar.jsx";

import theme from "../../theme/theme.js";


const activeSlide = {
  opacity: "1 !important",
  transform: "translateX(0)",
  zIndex: 1,
};

const lastSlide = {
  transform: "translateX(-100%)",
  zIndex: -1,
};
const nextSlide = {
  transform: "translateX(100%)",
  zIndex: -1,
};

const Slide = styled(Box)((props) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  transition: "0.5s ease",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  // opacity: 0,
}));

const SliderIconButton = styled((props) => (
  <IconButton disableRipple {...props} />
))(({ theme }) => ({
  position: "absolute",
  color: "#fff",
  zIndex: 1,
}));

const DotsBox = styled((props) => (
  <Box disableRipple {...props}></Box>
))(({ theme }) => ({
  position: "absolute",
  color: "#fff",
  zIndex: 1,
}));

const SliderForPages = () => {

  const [index, setIndex] = useState(2);

  const moveNextSlide = () => {
    setIndex((oldIndex) => {
      const result = (oldIndex + 1) % Slides.length;
      console.log(result)
      return result;
    });
  };
  const movePrevSlide = () => {
    setIndex((oldIndex) => {
      const result = (oldIndex - 1 + Slides.length) % Slides.length;
      return result;
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        const result = (oldIndex + 1) % Slides.length;
        return result;
      });
    }, 10000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

 

  return (
    <Stack 
      flexDirection="row" 
      sx={{
        maxWidth: "100vw",
        height: "100vh",
        overflowX: "hidden !important",
        position: "relative",
      
      }}
    >
      {Slides.map((slide, slideIndex) => {
        let position = nextSlide;
        if (slideIndex === index) {
          position = activeSlide;
        
        }
        if (
          slideIndex === index - 1 ||
          (index === 0 && slideIndex === Slides.length - 1)
        ) {
          position = lastSlide;
          
        }

        return (
          <Slide
            sx={{
              background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${slide.img})`,
              ...position,
            }}
          ></Slide>
        );
      })}
      <Container maxWidth='100%'  sx={{ position: "relative", display:'flex', flexDirection:'column',  }}>
      <DotsBox sx={{top:0, right:0, width:'100%' }}><Navbar/></DotsBox>
      
      <SliderIconButton sx={{bottom:'40%', left: '7%' }} onClick={ movePrevSlide}>
          <ArrowBackIosIcon sx={{ fontSize: "42px", '&:hover':{
            color: theme.palette.primary.main}  }} />
        </SliderIconButton>
        <SliderIconButton sx={{bottom:'40%', right: '7%' }} onClick={moveNextSlide}>
          <ArrowForwardIosIcon sx={{ fontSize: "42px", '&:hover':{
            color: theme.palette.primary.main}  }} />
        </SliderIconButton>
       
      </Container>
    </Stack>
  );
};

export default SliderForPages;
