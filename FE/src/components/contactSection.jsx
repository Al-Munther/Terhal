import React from "react";

import Section from "./section/Section";
import { Box, Stack, Typography } from "@mui/material";
import {Phone} from "@mui/icons-material";
import theme from '../theme/theme';
import contactBG from './contactBG2.jpg'

export default function ContactSection(){

    
    return(
        <Section>
            <Stack height='300px' direction='row' sx={{background:`url(${contactBG})` , backgroundSize:'100% 100%', opacity:"1.2"}}>
                <Box sx={{width:'50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Typography fontSize='48px'  textAlign='left' lineHeight='55px' fontWeight={700} color='#fff' p='0 100px' opacity='1'>
                        Call Us If you Want To Book Or Want To Ask A Question.
                    </Typography>
                </Box>
                <Box sx={{width:'50%', display:'flex', justifyContent:'center', alignItems:'center', gap:'20px'}}>
                <Phone sx={{fontSize:'66px', color:theme.palette.primary.main, pt:'5px'}}/>
                <Typography fontSize='54px' textAlign='center' lineHeight='75px' fontWeight={700} color='#fff'>
                    (801) 776 441 777</Typography></Box>
            </Stack>
        </Section>
    )
}