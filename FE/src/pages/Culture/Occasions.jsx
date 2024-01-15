import React, {useState} from "react";

import Section from "../../components/section/Section";

import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import img1 from './Cimgs/Fetr.jpg'
import img2 from './Cimgs/Adha.jpg'
import img3 from './Cimgs/22.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme/theme";


export default function OcasionsSection(){

    const Occasions = [{id:1, Name:'Eid Al-Fitr', describe:"It is celebrated in Yemen after the end of the blessed month of Ramadan, when family, relatives and friends gather to exchange greetings and celebrate the holiday.", 
    img:img1},
    {id:2, Name:"Eid al-Adha", describe:"It is celebrated in Yemen after the sighting of the crescent of Dhu al-Hijjah, and Muslims perform the Eid prayer, slaughter the sacrifice and distribute it to the poor and needy.",
     img:img2 },
    {id:3, Name:'National Day',describe:"It is celebrated in Yemen on the 22nd of May every year. This day is the anniversary of the unification of North and South Yemen in 1990.", 
    img:img3}]

    const [expanded, setExpanded] = useState("");

    const handleExpand = (isExpanded, id) => {
        setExpanded(isExpanded ? id : "");
    };

    const OccasionsList =Occasions.map(item => 
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
        <Section header="Occasions" subTitle="Check Out Yemen's Occasions">
            <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='50px' >
                {OccasionsList}
            </Box>
        </Section>
    )
}