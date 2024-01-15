import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import theme from "../../theme/theme";

// const SectionHeader = styled(Typography)(({theme})=>({
//     fontSize:'48px',

// }))

const SectionHeader = ({ header, subTitle }) => {
  return (
    <Stack alignItems="center">
      <Box >
        <Typography variant="h1" sx={{ fontSize: "48px" ,fontWeight:600}}>
          {header}
        </Typography>
        <Typography fontSize='20px' color={theme.palette.primary.main} >
          {subTitle}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SectionHeader;
