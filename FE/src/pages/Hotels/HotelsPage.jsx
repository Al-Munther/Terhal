import React from "react";

import Section from "../../components/section/Section";
import Pagination from '@mui/material/Pagination';
import { Card, CardContent, CardMedia, Grid, Stack, Typography, Box, Button } from "@mui/material";
import HotelsData from "./HotelsData";
import theme from "../../theme/theme";
import Navbar from "../../components/navBar";


export default function HotelsPage(){


    const HotelsList = HotelsData.map((item, index) => 
        <Card key={index} sx={{
            height:'250px',
            width:'450px',
            border:'none',
            borderRadius:0,
            display:'flex',
            flexDirection:'row',
        }}>
        <CardMedia sx={{width:'45%'}} image={item.img}/>
        <CardContent sx={{width:'50%'}}>
            <Typography fontSize='28px' fontWeight={600} textAlign='left' color={theme.palette.primary.main} >{item.Name}</Typography>
            <Typography fontSize='20px' fontWeight={600} textAlign='left' color={theme.palette.text.primary} p='0 10px 5px 10px'>{item.Location}</Typography>
            <Box display='flex' alignItems='center' justifyContent='space-between' p='0 10px'>
            <Box display='flex' alignItems='center' gap='5px'>
            <Typography fontSize='16px' fontWeight={400} textAlign='left' p='2px' color={theme.palette.text.primary} >
                {item.Descrption}
            </Typography>
            </Box>
            </Box>
            <Button sx={{height:'30px',backgroundColor:theme.palette.primary.main,color:'#fff',fontSize:'15px','&:hover':{backgroundColor: theme.palette.primary.light}}}>More</Button>
        </CardContent>
        </Card>
        )
    return(
        <Stack>
            <Navbar color={theme.palette.text.primary}/>
            <Section header="Hotels" subTitle="Check our Trip Hotels">
            <Stack alignItems='center' justifyContent='center' spacing={10}>
                <Grid display='grid' gridTemplateColumns='1fr 1fr 1fr' gap='50px' p='0 70px' alignItems='center' justifyContent='center'>
                    {HotelsList}
                </Grid>
                <Pagination count={5}  size="large"/>
            </Stack>
                
            </Section>
        </Stack>
    )
}