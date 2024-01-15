import { Typography, Box} from '@mui/material'
import { Stack } from '@mui/system'
import theme from '../../../theme/theme'
import React from 'react'
import BG from './weather.jpg'


const Weather = () => {
  return (
    <Stack   maxHeight='500px'   alignItems='center' justifyContent='center'  color='#FFFFFF'>
    <Stack  width='90%' display='flex' flexDirection='row' boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'>
        <Stack width='50%'  display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Box width='100%' height='100%' sx={{background:`url(${BG})`, backgroundSize:'100% 100%'}}></Box>
        </Stack>
        <Stack  width='50%'  display='flex' flexDirection='column'  alignItems='flex-start' p='20px' bgcolor={theme.palette.secondary.main} sx={{borderLeft:`10px solid ${theme.palette.primary.main}`,}}>
                <Typography fontSize='36px' textAlign='center' fontWeight='700'  >
                    Weather
                </Typography>
          <Typography fontSize='16px' fontWeight='700' textAlign='left' lineHeight='35px' pl={2}>
            Sanaʽa features a cold desert climate (Köppen: BWk).[33] Sanaʽa sees on average 265 mm (10.43 in) of precipitation per year. Due to its high elevation, however, temperatures are much more moderate than many other cities on the Arabian Peninsula; average temperatures remain relatively constant throughout the year in Sanaʽa, with its coldest month being January and its warmest month July. Even considering this, as a result of its lower latitude and higher elevation, UV radiation from the sun is much stronger than in the hotter climates farther north on the Arab peninsula.
          </Typography>
        </Stack>
    </Stack>
        
    </Stack>
  )
}

export default Weather