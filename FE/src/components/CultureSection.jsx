import { Typography, Box, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import theme from "../theme/theme";
import React, { useState } from "react";
import Bw from "../pages/Culture/Cimgs/th.jpg";
import FY from "../pages/Culture/Mandi.jpg";
import CY from "../pages/Culture/Cimgs/mawaz.jpg";
import TY from "../pages/Culture/Cimgs/wedding.jpg";
import HY from "../pages/Culture/Cimgs/Saba.jpg";
import OY from "../pages/Culture/Cimgs/Adha.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "@emotion/styled";
import Section from "./section/Section";
import ExtractBtn from "./ExtractBtn";

const activeSlide = {
  opacity: "1 !important",
  transform: "translateX(0)",
  zIndex: 1,
};

const lastSlide = {
  transform: "translateX(-100%)",
  zIndex: -1,
};
const nextSlide = {
  transform: "translateX(100%)",
  zIndex: -1,
};

const Slide = styled(Box)((props) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  transition: "0.5s ease",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  // opacity: 0,
}));

const SliderIconButton = styled((props) => (
  <IconButton disableRipple {...props} />
))(({ theme }) => ({
  position: "absolute",
  color: "#fff",
  zIndex: 1,
}));

export default function CultureSection() {
  const [index, setIndex] = useState(2);

  const moveNextSlide = () => {
    setIndex((oldIndex) => {
      const result = (oldIndex + 1) % cultureData.length;
      console.log(result);
      return result;
    });
  };
  const movePrevSlide = () => {
    setIndex((oldIndex) => {
      const result = (oldIndex - 1 + cultureData.length) % cultureData.length;
      return result;
    });
  };

  const cultureData = [
    {
      name: " Weather",
      describe:
        "The weather in Yemen is characterized by diversity and difference between regions and annual seasons, and Yemen can be divided into three main climatic sections: wet coastal areas, dry mountainous areas, and hot desert areas. Temperatures in Yemen range between 20 degrees Celsius in the winter and 40 degrees Celsius in the summer. The rains also fall unevenly in Yemen, as the rains are heavy in the northern coastal and mountainous regions during the winter, while the rains are less in the desert and southern regions. The wettest months in Yemen are August and September, while the driest months are July and August. Yemen is also affected by the monsoons that blow from India and Pakistan, which increase temperatures and dryness in some areas. Agriculture in Yemen is greatly affected by weather conditions, as it depends on rain in most regions, and drought and famine are among the biggest challenges facing agriculture in Yemen.",
      img: Bw,
    },
    {
      name: "Food",
      describe:
        "Food in Yemen is characterized by diversity and unique flavors, as Yemeni cuisine is famous for its delicious and varied dishes that reflect the rich heritage and culture of the country. It includes some of the famous dishes in Yemen, such as fattah, salta, hareed, zubaidi, manthwa, hot soup, kallah, mandi and easy. Yemeni dishes are characterized by the heavy use of natural spices and herbs such as cardamom, cumin, thyme, black pepper, red pepper, turmeric and ginger. In Yemen, food is eaten with hands, as aged Yemeni bread is used for eating, and green tea is served after meals. Yemeni cuisine is famous for protein-rich foods such as meat, chicken, fish, rice, lentils, beans and chickpeas. Yemeni dishes reflect the heritage and culture of the Yemeni people, and form an important part of the country's cultural identity.",
      img: FY,
    },
    {
      name: "Colthes",
      describe:
        "Clothing in Yemen is characterized by diversity and beauty, as traditional clothing differs from one region to another in Yemen. These clothes are characterized by bright colors, beautiful designs and exquisite embroidery. The traditional clothes in Yemen include the djellaba, the shemagh, the headband, the dishdasha, the keffiyeh, the jubah, the turban, and the veil. The traditional clothes in Yemen differ between men and women. Some areas in Yemen are famous for producing traditional clothes, such as Sana'a, Taiz and Hadramout. The traditional clothes in Yemen reflect the rich culture and heritage of the country, and express the Yemeni identity and adherence to ancient traditions and customs.",
      img: CY,
    },
    {
      name: "Traditons",
      describe:
        "Customs and traditions in Yemen vary between the northern, southern and central regions, and differ between cities, villages and tribes. Some of the common customs and traditions in Yemen include hospitality, generosity, marriage that lasts for several days, and traditional dress that is characterized by bright colors and beautiful designs. Henna is also used on social occasions, and celebrations of religious holidays are marked by prayers, social visits, and the exchange of gifts. Many tribes in Yemen are also distinguished by their own customs and traditions, as customs and traditions differ among the tribes in terms of dress, food, music and dances. The customs and traditions of Yemen reflect the basic values   in Yemeni society such as generosity, hospitality and social cooperation, and also reflect the rich culture and heritage of the country.",
      img: TY,
    },
    {
      name: "History",
      describe:
        "Yemen has an ancient civilization and a beautiful history rich in cultural, civilizational and commercial achievements. The ancient Kingdom of Sheba and the ancient Kingdom of Himyar are among the most important kingdoms that arose in Yemen, as they were characterized by cultural, scientific, artistic and agricultural development. Yemen was also known as the cradle of Islam, as the first message of Islam was sent from Yemen to the Persian Emperor. During the Ottoman period, Yemen was witnessing economic, cultural and social growth, as infrastructure was developed, trade routes expanded, and schools and universities were established. In the twentieth century, Yemen witnessed a strong diplomatic and political struggle for independence and liberation from British occupation. And still today, Yemen maintains its wonderful historical monuments and sites, such as the ancient city of Shibam, the ancient city of Zabid and the ancient city of Sana'a, which attract tourists from all over the world.",
      img: HY,
    },
    {
      name: "Occasions",
      describe:
        "Yemen witnesses many cultural, social and religious events that express its rich heritage and express its values   and traditions. The occasion of marriage is considered one of the most important occasions in Yemen, as it lasts for several days and includes many ceremonies, including engagement parties, weddings, and popular celebrations. Yemen also celebrates many religious holidays, such as Eid al-Fitr, Eid al-Adha and Eid al-Hijrah, where collective prayers are held and gifts and congratulations are exchanged. Yemen also witnesses many cultural and artistic events, such as the Yemeni Coffee Festival, the Arts and Music Festival, and the Tourism and Heritage Festival. The occasion of henna is also a common occasion in Yemen, where henna is used in social events such as marriage, religious ceremonies, and others. Events in Yemen are characterized by hospitality, generosity and social cooperation, and express the culture and heritage of the Yemeni people.",
      img: OY,
    },
  ];

  return (
    <Section header="Culture" subTitle="Know more about Yemen's culture">
      <Stack>
        <Stack
          flexDirection="row"
          height="550px"
          alignSelf="center"
          justifySelf="center"
          color="#FFFFFF"
          width="90%"
          boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
          sx={{
            overflowX: "hidden !important",
            position: "relative",
          }}
        >
          {cultureData.map((item, slideIndex) => {
            let position = nextSlide;
            if (slideIndex === index) {
              position = activeSlide;
            }
            if (
              slideIndex === index - 1 ||
              (index === 0 && slideIndex === cultureData.length - 1)
            ) {
              position = lastSlide;
            }

            return (
              <Slide
                sx={{
                  ...position,
                }}
              >
                <Stack
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  height="100%"
                >
                  <Stack
                    width="50%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      width="100%"
                      height="100%"
                      sx={{
                        background: `url(${item.img})`,
                        backgroundSize: "100% 100%",
                      }}
                    ></Box>
                  </Stack>
                  <Stack
                    width="50%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    p="20px"
                    sx={{
                      borderLeft: `10px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Typography
                      color={theme.palette.secondary.main}
                      fontSize="36px"
                      textAlign="center"
                      fontWeight="700"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      color={theme.palette.secondary.main}
                      fontSize="16px"
                      fontWeight="700"
                      textAlign="left"
                      lineHeight="35px"
                      pl={2}
                      pr={4}
                    >
                      {item.describe}
                    </Typography>
                  </Stack>
                </Stack>
              </Slide>
            );
          })}

          <SliderIconButton
            sx={{ bottom: "40%", left: "2%" }}
            onClick={movePrevSlide}
          >
            <ArrowBackIosIcon
              sx={{
                fontSize: "42px",
                color: theme.palette.secondary.main,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </SliderIconButton>
          <SliderIconButton
            sx={{ bottom: "40%", right: "2%" }}
            onClick={moveNextSlide}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: "42px",
                color: theme.palette.secondary.main,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </SliderIconButton>
        </Stack>
      </Stack>
      <ExtractBtn text="Show more" link="/Culture" />
    </Section>
  );
}
