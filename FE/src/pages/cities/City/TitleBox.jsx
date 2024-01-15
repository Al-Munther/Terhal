import React from "react";
import { Typography, Box, useTheme, Stack } from "@mui/material";
import theme from "../../../theme/theme";

const brColor = theme.palette.primary.main
const TitleBox = ({ header }) => {
  const theme = useTheme();
  return (
    <Stack  alignItems="center">
      <Box  sx={{bgcolor:theme.palette.text.primary , borderLeft:`10px solid ${brColor}`, p:'5px 17px 5px 20px'}}>
        <Typography variant="h1" textAlign='right' lineHeight='58px' fontStyle='medium' sx={{color:'#fff',fontFamily:`${theme.typography.fontFamily}`, fontSize: "50px" ,fontWeight:500}}>
          {header}
        </Typography>
      </Box>
    </Stack>
  );
};

export default TitleBox;
