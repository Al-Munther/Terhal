import React, {useState} from "react";

import Section from "../../components/section/Section";

import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import img1 from './Cimgs/Saba.jpg'
import img2 from './Cimgs/26.jpg'
import img3 from './Cimgs/Hadar.jpeg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme/theme";


export default function HistorySection(){

    const History = [{id:1, Name:'The Yemeni civilization of Saba', describe:"It was an ancient civilization that arose in the third millennium BC and flourished between the first century BC and the sixth century AD. It is famous for its complex engineering design, trade, agriculture, industry, and its great influence on Arab and Islamic civilization.", 
    img:img1},
    {id:2, Name:"The September 26 Revolution", describe:"It is the event that led to the proclamation of the Republic in North Yemen and liberation from British colonialism in 1962, and the revolutionaries were able to control most of the major cities, and it led to major shifts in politics, economy and society in North Yemen.",
     img:img2 },
    {id:3, Name:'Ancient Hadramout',describe:"It was an ancient state in the south of the Arabian Peninsula (Yemen), was founded between the third and first centuries BC, and flourished over many centuries depending on agriculture and trade, and is famous for its beautiful ancient cities and ancient monuments.", 
    img:img3}]

    const [expanded, setExpanded] = useState("");

    const handleExpand = (isExpanded, id) => {
        setExpanded(isExpanded ? id : "");
    };

    const HistoryList =History.map(item => 
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
        <Section header="History" subTitle="Check Out Yemen's History">
            <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='50px' >
                {HistoryList}
            </Box>
        </Section>
    )
}