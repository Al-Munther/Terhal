import React, {useState} from "react";

import Section from "../../components/section/Section";

import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import img1 from './Cimgs/thawb.jpg'
import img2 from './Cimgs/mawaz.jpg'
import img3 from './Cimgs/starah.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme/theme";


export default function ClothesSection(){

    const Clothes = [{id:1, Name:'Thawb', describe:"loose and long-sleeved ankle-length garment. It’s a formal outfit, often worn by men for special occasions.", 
    img:img1},
    {id:2, Name:"Ma'wazz", describe:"another variation of a futa. This one is more formal than the two previous garments. Yemeni men wear ma'wazz for weddings, ceremonies, and other special occasions.",
     img:img2 },
    {id:3, Name:'Starah',describe:"women’s black outer garment. It is worn over the other clothes. This outer garment is especially widespread in the cities, where women wear mostly black.", 
    img:img3}]

    const [expanded, setExpanded] = useState("");

    const handleExpand = (isExpanded, id) => {
        setExpanded(isExpanded ? id : "");
    };

    const ClothesList =Clothes.map(item => 
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
        <Section header="Clothes" subTitle="Check Out Yemen's Clothes">
            <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='50px' >
                {ClothesList}
            </Box>
        </Section>
    )
}