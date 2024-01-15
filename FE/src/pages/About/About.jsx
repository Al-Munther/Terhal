import React from "react";

import Section from "../../components/section/Section";
import { Stack, Typography } from "@mui/material";
import theme from '../../theme/theme';
import Navbar from "../../layout/NavBar";


export default function AboutPage(){

    return(
        
            <Stack>
                <Navbar color={theme.palette.text.primary}/>
                <Section header="About Us" subTitle="Know more about Terhal">
                    <Typography fontSize='24px' textAlign='left' lineHeight='45px' p="0 100px" fontWeight={500} color={theme.palette.text.primary}>
                    The aim of the work is
Creation of a tourism web application to promote the tourism potential of Yemen.
The application will help attract tourists to Yemen by providing information
about cultural attractions
tourist routes
natural beauties
And other attractions worth visiting.
<br/>
<br/>

The main idea of the application is to focus on tourism in one country (Yemn)
<br/>
• Orientation to places popular with the local population, because site creators were born
and live in Yemen and know this country well<br/>
• Target audience - youth (students), so the focus is on a reasonable price
and places popular with young people
<br/>
<br/>
bezns- the idea is
Development of tourism in Yemen
Profits in industries related to the provision of tourism business.
  Partner with local companies for one-stop service
And Create and sell Yemen branded souvenirs online
                    </Typography>
                </Section>
            </Stack>
        
    )
}