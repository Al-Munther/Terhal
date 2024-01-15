import React from "react";

import Section from "../../components/section/Section";
import {Stack, Typography, Card, CardContent } from "@mui/material";
import {Phone} from "@mui/icons-material";
import theme from '../../theme/theme';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import MapCard from "./Map";
import Navbar from "../../layout/NavBar";


export default function ContactPage(){

    const Contacts = [
        {icon:<EmailIcon sx={{fontSize:'56px'}}/>, name:'Email', info:'email.gmial.com'},
        {icon:<Phone sx={{fontSize:'56px'}}/>, name:'Phone', info:'+793776441777'},
        {icon:<LocationOnIcon sx={{fontSize:'56px'}}/>, name:'Location', info:'SPB,balshoi brasbekt'}
    ]

    const ContactsList = Contacts.map((item, index) => 
        <Card key={index} sx={{
            height:'210px',
            width:'300px',
            border:'none',
            borderTop:`4px solid ${theme.palette.primary.main}` ,
            borderRadius:0,
            display:'flex',
            flexDirection:'column',
        }}>
        <CardContent sx={{height:'35%'}}>
            <Typography fontWeight={600} textAlign='left' color={theme.palette.primary.main} p='10px'>{item.icon}</Typography>
            <Typography fontSize='20px' fontWeight={600} textAlign='left' color={theme.palette.text.primary} p='5px 10px 5px 10px'>{item.name}</Typography>
            <Typography fontSize='20px' fontWeight={400} textAlign='left' color={theme.palette.text.primary} p='5px 10px'>{item.info}</Typography>
        </CardContent>
        </Card>
    )
    
    return(
            <Stack  >
                <Navbar color={theme.palette.text.primary}/>
                <Section header="CONTACTS" subTitle="We Are Waiting For You">
                <Stack direction='row' alignItems='center' justifyContent='center' spacing={10}>
                    {ContactsList}
                </Stack>
                </Section>

                <Section header="LOCATION" subTitle="Our Office Location ">
                    <MapCard/>
                </Section>
                
            </Stack>
    )
}