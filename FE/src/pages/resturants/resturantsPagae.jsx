import React from "react";

import Section from "../../components/section/Section";
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, CardMedia, Grid, Stack, Typography, Box } from "@mui/material";
import ResturantsData from "./resturantsData";
import theme from "../../theme/theme";
import Navbar from "../../components/navBar";


export default function ResturantsPage(){


    const RestaurantsList = ResturantsData.map((item, index) => 
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
        <Stack>
            <Navbar color={theme.palette.text.primary}/>
            <Section header="Resturants" subTitle="Check our Trip Resturants">
            <Stack alignItems='center' justifyContent='center' spacing={10}>
                <Grid display='grid' gridTemplateColumns='1fr 1fr 1fr 1fr' gap='50px' p='0 70px' alignItems='center' justifyContent='center'>
                    {RestaurantsList}
                </Grid>
                <Pagination count={5}  size="large"/>
            </Stack>
                
            </Section>
        </Stack>
    )
}