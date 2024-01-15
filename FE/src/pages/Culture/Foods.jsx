import React, {useState} from "react";

import Section from "../../components/section/Section";

import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import img1 from './Saltah.jpg'
import img2 from './Mandi.jpg'
import img3 from './Lahoh.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme/theme";


export default function FoodSection(){

    const Foods = [{id:1, Name:'Saltah', describe:"Yemen’s national dish, saltah, is at its heart a stew of red meat. However, the exact style differs dependent upon which of Yemen’s regions you eat it in. Vegetarian bean versions are also prepared.", 
    img:img1},
    {id:2, Name:"Mandi", describe:"With similarities to a biriyani, mandi is a dish of rice and meat. The meat can be mutton, goat, or chicken, although the very best mandi will use lamb for the fullest flavour.",
     img:img2 },
    {id:3, Name:'Lahoh',describe:"Prepared as a large flat disc rather like a pancake, lahoh isn’t technically a flat bread because it contains yeast.", 
    img:img3}]

    const [expanded, setExpanded] = useState("");

    const handleExpand = (isExpanded, id) => {
        setExpanded(isExpanded ? id : "");
    };

    const FoodsList =Foods.map(item => 
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
        <Section header="Foods" subTitle="Check Out Yemen's Food">
            <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='50px' >
                {FoodsList}
            </Box>
        </Section>
    )
}