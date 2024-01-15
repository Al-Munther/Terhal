import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SliderForPages from "../../../components/slider/slider";
import TitleBox from "./TitleBox";
import Weather from "./weather";
import ResturantsSection from "./RestrauntsSection";
import GuiedsSection from "../../../components/GuidesSection";
import PlacesSection from "./Places";
import { useParams } from "react-router-dom";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { useContext, useEffect, useState } from "react";
import theme from "../../../theme/theme";
import Section from "../../../components/section/Section";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "../../../layout/NavBar";
import styled from "@emotion/styled";
import { guidesContext } from "../../../contexts/GuidesContext";
import AuthContext from "../../../contexts/Auth/AuthContext";
const BaseURL = "http://localhost:5000/";

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
export default function City() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [city, setCity] = useState(null);
  const [expanded, setExpanded] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [guide, setGuide] = useState("");
  const { guides, setGuides } = useContext(guidesContext);

  const handleExpand = (isExpanded, id) => {
    setExpanded(isExpanded ? id : "");
  };

  const handleChange = (event) => {
    setGuide(event.target.value.id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    sendRequest: sendGetCityRequest,
    status: getCityRequestStatus,
    error: getCityRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendCreateAppointmentRequest,
    status: createAppointmentRequestStatus,
    error: createAppointmentRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendGetGuidesRequest,
    status: getGuidesRequestStatus,
    error: getGuidesRequestError,
  } = useHttpRequest();

  console.log(createAppointmentRequestError)
  const createAppointment = () => {
    console.log({
      language,
      guideId: guide,
      description,
      touristId: authState.info.id,
    });
    sendCreateAppointmentRequest(
      {
        url: "api/appointments/",
        data: {
          language,
          guideId: guide,
          description,
          touristId: authState.info.id,
        },
        method:"POST",
      },
      (data) => {
        setGuide("");
        setLanguage("");
        setDescription("");
        console.log(data);
      }
    );
  };

  useEffect(() => {
    sendGetCityRequest({ url: `api/cities/${id}` }, (data) => {
      setCity(data)
      console.log("/////////////////////////////////////////")
      console.log(data.hotels)
    });
    sendGetGuidesRequest({ url: "api/guides" }, (data) =>
      setGuides(data.guides)
    );
  }, [sendGetCityRequest, id, sendGetGuidesRequest, setGuides]);

  if (getCityRequestStatus === "loading") {
    return <></>;
  }

  if (getCityRequestStatus === "failed") {
    return <>Error</>;
  }

  console.log(city);

  return (
    <Stack direction="column" spacing={0}>
      <Navbar color={theme.palette.text.primary} />
      {!city ? (
        <></>
      ) : (
        <>
          {/* <img
            src={BaseURL + city.city?.image}
            alt={city.city?.name}
            style={{ margin: "0", height: "100vh" }}
          /> */}
          {
            authState ? (<Button
            sx={{
              position: "fixed",
              zIndex: "10",
              right: "20px",
              bottom: "50px",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            reserve
          </Button>) : <Button disabled
            sx={{
              position: "fixed",
              zIndex: "10",
              right: "20px",
              bottom: "50px",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            log in to reserve
          </Button>
          }
          
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{ padding: "20px 10px" }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}
            >
              Create an appointment
            </DialogTitle>
            <DialogContent>
              <Stack sx={{ width: "100%", height: "100%", gap: "10px" }}>
                <TextField
                  id=""
                  placeholder="Languages"
                  type="text"
                  // sx={inputStyle.sx}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                />
                <TextField
                  id=""
                  placeholder="description"
                  type="text"
                  // sx={inputStyle.sx}
                  value={description}
                  fullWidth
                  minRows={5}
                  maxRows={6}
                  multiline
                  onChange={(event) => setDescription(event.target.value)}
                />
                <FormControl>
                  <Select
                    name="cities"
                    // value=c}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => selected.name}
                  >
                    {false ? (
                      <></>
                    ) : (
                      guides?.map((guide, index) => {
                        return (
                          <MenuItem key={index} value={guide}>
                            {guide.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={createAppointment}>
                  Create
                </Button>
                {createAppointmentRequestStatus === "succeeded" ? (
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert
                  </Alert>
                ) : (
                  <></>
                )}
              </Stack>
            </DialogContent>
          </Dialog>
          <Box width='100%' height='700px'
            sx={{
              background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${
                BaseURL + city.city.image
              })`,
              backgroundSize:'100% 100%',

              
            }}
          ></Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            pl={10}
            gap={5}
            pt={5}
          >
            <TitleBox header={city.city.name} />
            <Typography fontSize={22} textAlign="left" pl={5} pr={10}>
              {city.city.description}
            </Typography>
          </Box>
          <Stack>
          <Section header="Places" subTitle="Check Out Yemen's Places">
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap="50px"
            >
              {city.places?.map((item) => (
                <Box
                  sx={{
                    height: "250px",
                    width: "400px",
                    background: `url(${BaseURL + item.image})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Accordion
                    key={item.id}
                    expanded={expanded === item.id}
                    onChange={(event, isExpanded) =>
                      handleExpand(isExpanded, item.id)
                    }
                    sx={{
                      backgroundColor: "#1E1E1EB2",
                      "&.Mui-expanded": {
                        borderTop: `${theme.palette.primary.main} 5px solid`,
                      },
                      borderRadius: "20px !important",
                      boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
                      "&:before": {
                        display: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      id={item.id}
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                      }
                      sx={{
                        color: "#fff",
                        fontSize: 18,
                        "& .Mui-expanded": {
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        },
                      }}
                    >
                      {item.name}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: "#fff", fontSize: 18 }}>
                        <Typography fontSize="16px" textAlign="left" pb={1}>
                          <LocationOnIcon
                            sx={{ fontSize: "16px", mr: "10px" }}
                          />
                          {item.location}
                        </Typography>
                        {item.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          </Section>
          <Section header="Resturants" subTitle="Check our Resturants">
            <Stack width="100%" direction="row" justifyContent="space-evenly">
              {city.restraunts?.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    height: "450px",
                    width: "300px",
                    border: "none",
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia sx={{ height: "55%" }} image={BaseURL + item.image} />
                  <CardContent sx={{ height: "35%" }}>
                    <Typography
                      fontSize="28px"
                      fontWeight={600}
                      textAlign="left"
                      color={theme.palette.primary.main}
                      p="10px 0 5px 10px"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      fontSize="20px"
                      fontWeight={600}
                      textAlign="left"
                      color={theme.palette.text.primary}
                      p="0 10px 5px 10px"
                    >
                      {item.location}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      p="0 10px"
                    >
                      <Box display="flex" alignItems="center" gap="5px">
                        <Typography
                          fontSize="16px"
                          fontWeight={400}
                          textAlign="left"
                          p="2px"
                          color={theme.palette.text.primary}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Section>
          </Stack>
          <Section subTitle='Check our Hotels' header="Hotels">
            <Stack width="100%" direction="row" justifyContent="space-evenly">
            {city.hotels?.map((item, index)=> (
              <Card key={index} sx={{
            height:'250px',
            width:'450px',
            border:'none',
            borderRadius:0,
            display:'flex',
            flexDirection:'row',
        }}>
        <CardMedia sx={{width:'45%'}} image={BaseURL + item.image}/>
        <CardContent sx={{width:'50%'}}>
            <Typography fontSize='28px' fontWeight={600} textAlign='left' color={theme.palette.primary.main} >{item.name}</Typography>
            <Typography fontSize='20px' fontWeight={600} textAlign='left' color={theme.palette.text.primary} p='0 10px 5px 10px'>{item.location}</Typography>
            <Box display='flex' alignItems='center' justifyContent='space-between' p='0 10px'>
            <Box display='flex' alignItems='center' gap='5px'>
            <Typography fontSize='16px' fontWeight={400} textAlign='left' p='2px' color={theme.palette.text.primary} >
                {item.description}
            </Typography>
            </Box>
            </Box>
        </CardContent>
        </Card>
            ))}
            </Stack>
          </Section>
          <Section header="Guieds" subTitle="Check our Trip Guieds">
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-evenly"
              flexWrap="wrap"
              gap="10px"
            >

              {city.guides?.map((item, index) => (
                <Card
                  sx={{
                    height: "420px",
                    width: "300px",
                    border: "none",
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    sx={{ height: "65%" }}
                    image={BaseURL + item.image}
                  />
                  <CardContent sx={{ height: "35%" }}>
                    <Typography
                      fontSize="28px"
                      fontWeight={600}
                      textAlign="left"
                      color={theme.palette.primary.main}
                      p="10px 0 5px 10px"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      fontSize="20px"
                      fontWeight={600}
                      textAlign="left"
                      color={theme.palette.text.primary}
                      p="0 10px 5px 10px"
                    >
                      {item.location}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      p="0 10px"
                    >
                      <Box display="flex" alignItems="center" gap="5px">
                        {item.languages.map((lang, innerIndex) => (
                          <Typography
                            fontSize="16px"
                            fontWeight={400}
                            textAlign="left"
                            p="2px"
                            color="#fff"
                            bgcolor={theme.palette.text.primary}
                            key={innerIndex}
                          >
                            {lang}
                          </Typography>
                        ))}
                      </Box>
                      <Typography
                        fontSize="20px"
                        fontWeight={400}
                        textAlign="left"
                        color={theme.palette.text.primary}
                        p="0 10px"
                      >
                        {item.price}$/Day
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Section>
        </>
      )}
    </Stack>
  );
}
