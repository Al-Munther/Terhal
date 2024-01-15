import React from "react";

import Section from "../../../components/section/Section";
import ExtractBtn from "../../../components/ExtractBtn";
import { Card, CardContent, CardMedia, Stack, Typography, Box } from "@mui/material";
import img1 from './rest.jpg'
import theme from "../../../theme/theme";


export default function ResturantsSection(){
    const Restaurants = [
        {Name:"Layaly Sana'a",Location:"Sana'a, Hada'a", Descrption:"This resturants serves diffrenet kinds of yemeni's traditional food", img:img1, link:''},
        {Name:"Layaly Sana'a",Location:"Sana'a, Hada'a",Descrption:"This resturants serves diffrenet kinds of yemeni's traditional food", img:img1, link:''},
        {Name:"Layaly Sana'a",Location:"Sana'a, Hada'a",Descrption:"This resturants serves diffrenet kinds of yemeni's traditional food", img:img1, link:''}]
   

    const RestaurantsList = Restaurants.map((item, index) => 
        <Card key={index} sx={{
            height:'450px',
            width:'300px',
            border:'none',
            borderRadius:0,
            display:'flex',
            flexDirection:'column',
        }}>
        <CardMedia sx={{height:'55%'}} image={item.img}/>
        <CardContent sx={{height:'35%'}}>
            <Typography fontSize='28px' fontWeight={600} textAlign='left' color={theme.palette.primary.main} p='10px 0 5px 10px'>{item.Name}</Typography>
            <Typography fontSize='20px' fontWeight={600} textAlign='left' color={theme.palette.text.primary} p='0 10px 5px 10px'>{item.Location}</Typography>
            <Box display='flex' alignItems='center' justifyContent='space-between' p='0 10px'>
            <Box display='flex' alignItems='center' gap='5px'>
            <Typography fontSize='16px' fontWeight={400} textAlign='left' p='2px' color={theme.palette.text.primary} >
                {item.Descrption}
            </Typography>
            </Box>
            </Box>
        </CardContent>
        </Card>
        )
    return(
        <Section header="Resturants" subTitle="Check our Resturants">
            <Stack width='100%' direction='row' justifyContent='space-evenly'>
                {RestaurantsList}
            </Stack>
            <ExtractBtn link='' text="More Resturants"/> 
        </Section>
    )
}