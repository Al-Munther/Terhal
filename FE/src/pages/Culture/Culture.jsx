import { Stack } from "@mui/material";
import FoodSection from "./Foods";
import ClothesSection from "./Clothes";
import OcatsionsSection from "./Occasions";
import HistorySection from "./History";
import TraditionsSection from "./Traditions";
import Navbar from "../../layout/NavBar";
import theme from "../../theme/theme";

export default function Culture(){


    return(
        <Stack direction='column' spacing={10} pb={10}>
            <Navbar color={theme.palette.text.primary}/>
            <FoodSection/>
            <ClothesSection/>
            <OcatsionsSection/>
            <TraditionsSection/>
            <HistorySection/>
        </Stack>
    )
}