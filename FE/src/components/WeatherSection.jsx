import React from "react";

import Section from "./section/Section";
import { Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import weather from './weather.jpg'
import theme from "../theme/theme";


export default function WeatherSection(){

    return(
        <Section header="CULTURE" subTitle=" Yemen’s Culture components">
            <Stack direction='row' height='700px'  justifyContent='space-between' alignItems='center' overflow='hidden'>
        
            {/* <Card sx={{
                height:'570px',
                width:'450px',
                border:'none',
                display:'flex',
                borderRadius:'0',
                flexDirection:'column',
                transform:'rotate(-20deg) translate(-150px)'
            }}>
            <CardMedia sx={{height:'45%'}} image={weather}/>
            <CardContent sx={{height:'55%', display:'flex', flexDirection:'column',gap:'5px'}}>
                <Typography fontSize='28px' fontWeight={600} lineHeight='38px' textAlign='left' color={theme.palette.primary.main}>WEATHER</Typography>
                <Typography fontSize='20px' fontWeight={400} lineHeight='26px' textAlign='left' color={theme.palette.secondary.main} pl='5px'>Yemen's weather is a marvel of nature, with diverse climates that offer a unique experience. Coastal regions are warm and humid, with turquoise waters. Inland, cool mountain breezes and misty valleys are perfect for hiking. Deserts are hot and dry, with shimmering sand dunes. Yemen's weather has something for everyone.</Typography>
                <Button sx={{width:'150px', height:'40px', backgroundColor:theme.palette.text.primary, color:'#fff',
            fontSize:'18px', mt:'10px', border:'none', borderRadius:'0'}}>VIEW MORE</Button>
            </CardContent>
            </Card> */}

            <Card sx={{
                height:'600px',
                width:'100%',
                border:'none',
                display:'flex',
                borderRadius:'0',
                flexDirection:'row',
                position:'relative'
            }}>
            <CardMedia sx={{height:'45%',width:'50%'}} image={weather}/>
            <CardContent sx={{height:'55%',width:"50%", display:'flex', flexDirection:'column',gap:'5px'}}>
                <Typography fontSize='28px' fontWeight={600} lineHeight='38px' textAlign='left' color={theme.palette.primary.main}>WEATHER</Typography>
                <Typography fontSize='20px' fontWeight={400} lineHeight='26px' textAlign='left' color={theme.palette.secondary.main} pl='5px'>Yemen's weather is a marvel of nature, with diverse climates that offer a unique experience. Coastal regions are warm and humid, with turquoise waters. Inland, cool mountain breezes and misty valleys are perfect for hiking. Deserts are hot and dry, with shimmering sand dunes. Yemen's weather has something for everyone.</Typography>
                <Button sx={{width:'150px', height:'40px', backgroundColor:theme.palette.text.primary, color:'#fff',
            fontSize:'18px', mt:'10px', border:'none', borderRadius:'0'}}>VIEW MORE</Button>
            </CardContent>
            </Card>
            
            {/* <Card sx={{
                height:'570px',
                width:'450px',
                border:'none',
                display:'flex',
                borderRadius:'0',
                flexDirection:'column',
                transform:'rotate(20deg) translate(150px)',
                position:'relative'
            }}>
            <CardMedia sx={{height:'45%'}} image={weather}/>
            <CardContent sx={{height:'55%', display:'flex', flexDirection:'column',gap:'5px'}}>
                <Typography fontSize='28px' fontWeight={600} lineHeight='38px' textAlign='left' color={theme.palette.primary.main}>WEATHER</Typography>
                <Typography fontSize='20px' fontWeight={400} lineHeight='26px' textAlign='left' color={theme.palette.secondary.main} pl='5px'>Yemen's weather is a marvel of nature, with diverse climates that offer a unique experience. Coastal regions are warm and humid, with turquoise waters. Inland, cool mountain breezes and misty valleys are perfect for hiking. Deserts are hot and dry, with shimmering sand dunes. Yemen's weather has something for everyone.</Typography>
                <Button sx={{width:'150px', height:'40px', backgroundColor:theme.palette.text.primary, color:'#fff',
            fontSize:'18px', mt:'10px', border:'none', borderRadius:'0'}}>VIEW MORE</Button>
            </CardContent>
            </Card> */}
            </Stack>
        </Section>
        
    )
 
        }