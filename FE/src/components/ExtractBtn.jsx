import { Button, Stack } from "@mui/material";
import theme from "../theme/theme";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkOff } from "@mui/icons-material";


export default function ExtractBtn({text, link}){
    const navigate = useNavigate()
    return(
        <Stack height={'150px'} justifyContent='center' alignItems='center' >
            <Button onClick={()=>navigate(link)}  sx={{height:'70px', backgroundColor:theme.palette.text.primary, color:'#fff',p:'0 30px', fontSize:'24px','&:hover':{
            backgroundColor:theme.palette.primary.dark}}}>
                {text}
            </Button>
        </Stack>
        
    )
}