import React from 'react';
import theme from '../theme/theme';
import Logo from "../components/Logo.jpg";

import { Box, List, ListItem, Typography ,Stack, ListItemButton, IconButton, Container} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
    Email,
    LocationOn,
    Phone,
  } from "@mui/icons-material";


export default function Footer(){
    
    
    const footerStyles ={
        iconStyle:{ 
            padding: '0.4rem',
            fontSize: '30px',
            color:'#FFFFFF',
            '&:hover' :{
            color: '#FFD8A8',
        }},

        iconsBox:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '300px',
            height: '50px',
            fontSize: '30px'},

            listText : {
                
                p:'0 10px',
                m:0,
                fontSize:'16px',
                textTransform: 'uppercase',
                fontWeight: '400',
                color: '#fff',
                textAlign: 'left',
                borderRight:'3px solid #fff',
                '&:hover':{
                color: '#FFD8A8'} ,
                
            }, 

            listItem :{
                p:0,
                m:0,
                alignItems:'flex-start',
                color:'#FFFFFF' }
                ,
            contactsBox:{
                display:'flex',
                gap:'10px'
                , justifyContent:'flex-start', alignItems:'flex-start'
            }    
    };

    const listItems = [{item:'Home'},{item:'Cities'},{item:'Guides'},{item:'Contacts'},{item:'About'}]

    const newNavItems = listItems.map((newNavItem) => 
                 <ListItem sx={footerStyles.listItem}> 
                    <ListItemButton  sx={footerStyles.listText}>
                        {newNavItem.item}
                    </ListItemButton>
                </ListItem>);


    return(
        
        <Stack  height={{xs:'100%',lg:'300px'}} justifyContent={'center'}   position='static'    sx={{
            boxSizing: 'border-box',
            backgroundColor: theme.palette.text.primary,
            color: '#FFFFFF'
        }}>
        <Container  maxWidth="xl">
        <Stack direction={{md:'row',lg:'row'}} justifyContent='space-between' alignItems='center' spacing={{xs:'20px', lg:'100px'}} p={{xs:'50px', lg:'20px 0 0'}}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start', pl:'50px', gap:'15px'}}>
            <Box sx={{height:'90px', width:'90px', background:`url(${Logo})`, backgroundSize:'cover'}}> </Box>
                <List sx={{display:'flex', flexDirection:'row', justifyContent:'flex-start', ml:'-10px'}}>
                    {newNavItems}
                </List>
                &copy; Copyright 2022
            </Box>

            <Box sx={{display:'flex', flexDirection:'column', gap:'30px', justifyContent:'flex-start', alignItems:'flex-start'}}>
                <Box sx={footerStyles.contactsBox}><LocationOn /><Typography>sant,balshoi barulak </Typography></Box>
                <Box sx={footerStyles.contactsBox}><Phone /><Typography>+703776441777 </Typography></Box>
                <Box sx={footerStyles.contactsBox}><Email /><Typography textAlign="center">email@gmail.com </Typography></Box>
            </Box>
            <Box sx={{width:'300px', pr:'50px',display:'flex', flexDirection:'column', gap:'10px'}}>
            <Typography fontSize={'20px'} textAlign='left' pl={'10px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas.Lorem ipsum dolor</Typography>
            <Box sx={footerStyles.iconsBox}>
                <IconButton>
                    <TwitterIcon sx={footerStyles.iconStyle}/>
                </IconButton>
                <IconButton>
                    <FacebookIcon sx={footerStyles.iconStyle}/>
                </IconButton>
                <IconButton>
                    <InstagramIcon sx={footerStyles.iconStyle}/>
                </IconButton>
                </Box>
            </Box>
            </Stack>
            </Container>
            </Stack>
            
    )
}