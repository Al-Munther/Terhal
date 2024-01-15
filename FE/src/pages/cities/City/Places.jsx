import React, {useState} from "react";

import Section from "../../../components/section/Section";
import ExtractBtn from "../../../components/ExtractBtn";
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import img1 from './Shallal.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../../theme/theme";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PlacesSection(){

    const Places = [{id:1, Name:'Aden', Location:"Bany Matar",describe:"one of the most natural places in Sana'a, and one of the best in the world, you better visit it ", img:img1, link:''},
    {id:2, Name:"Sana'a", Location:"Bany Matar",describe:"one of the most natural places in Sana'a", img:img1, link:''},
    {id:3, Name:'Dhamar',Location:"Bany Matar",describe:"one of the most natural places in Sana'a", img:img1, link:''}]

    const [expanded, setExpanded] = useState("");

    const handleExpand = (isExpanded, id) => {
        setExpanded(isExpanded ? id : "");
    };

    const PlacesList = Places.map(item => 
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
                <Typography fontSize='16px' textAlign='left'  pb={1}><LocationOnIcon sx={{fontSize:'16px', mr:'10px'}}/>{item.Location}</Typography>
                  {item.describe}
                </Typography>
              </AccordionDetails> 
            </Accordion>
        </Box>
        )
    return(
        <Section header="Places" subTitle="Check Out Yemen's Places">
            <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='50px' >
                {PlacesList}
            </Box>
            <ExtractBtn link='/PlacesPage' text="More Places"/> 
        </Section>
    )
}