import React, {useState} from "react";

import Section from "../../components/section/Section";

import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import img1 from './Cimgs/wedding.jpg'
import img2 from './Cimgs/oud.jpg'
import img3 from './Cimgs/henah.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme/theme";


export default function TraditionsSection(){

    const Traditions = [{id:1, Name:"The Yemeni wedding", describe:"It is a wedding ceremony in which the bride and their families celebrate marriage, and it includes many rituals and traditions specific to it.", 
    img:img1},
    {id:2, Name:"Oud:",describe:"It is a musical instrument used in the Yemeni heritage, and it is played especially on social and religious occasions.",
     img:img2 },
    {id:3, Name:'Engraving with henna ',describe:"It is one of the most popular works among women in Yemen, especially during the days of Eid Al-Fitr and Al-Adha and wedding parties. Because of its importance, one of the Yemeni wedding nights is called “Henna Night”.", 
    img:img3}]

    const [expanded, setExpanded] = useState("");

    const handleExpand = (isExpanded, id) => {
        setExpanded(isExpanded ? id : "");
    };

    const TraditionsList =Traditions.map(item => 
        <Box sx={{
            height:'250px',
            width:'400px',
            background: `url(${item.img})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            borderRadius:'20px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-end'
        }}>
            
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={(event, isExpanded) =>
                handleExpand(isExpanded, item.id)
              }
              sx={{
                backgroundColor:"#1E1E1EB2",
                "&.Mui-expanded": {
                  borderTop: `${theme.palette.primary.main} 5px solid`,
                },
                borderRadius: "20px !important",
                boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)',
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                id={item.id}
                expandIcon={<ExpandMoreIcon sx={{color:theme.palette.primary.main}}/>}
                sx={{
                color:'#fff',
                  fontSize: 18,
                  "& .Mui-expanded": {
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  },
                }}
              >
                {item.Name}
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ color:"#fff", fontSize: 18 }}
                >
                  {item.describe}
                </Typography>
              </AccordionDetails> 
            </Accordion>
        </Box>
        )
    return(
        <Section header="Traditions" subTitle="Check Out Yemen's Traditions">
            <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='50px' >
                {TraditionsList}
            </Box>
        </Section>
    )
}