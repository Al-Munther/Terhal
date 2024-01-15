import { Stack, Card, Box, Typography, Container,Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import img1 from "./defualt.jpg";
import theme from "../../theme/theme";
import Navbar from "../../layout/NavBar";
import Table from "../../components/tables/Table";
import { opointmentsContext } from "../../contexts/OpointmentsContext";
import useHttpRequest from "../../hooks/useHttpRequest";
import AuthContext from "../../contexts/Auth/AuthContext";

const BaseURL = "http://localhost:5000/";


const RenderGuide = (params) =>{
  return <p>{params.value.name}</p>
}

const ImageRender = (params) => {
  return (
    <img src={`${BaseURL}${params.value}`} alt={params.value} width="100%" />
  );
};


const columns = [
  {
    field: "guide",
    headerName: "guide",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
    renderCell: RenderGuide,
  },
  {
    field: "description",
    headerName: "description",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "language",
    headerName: "language",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "accepted",
    headerName: "accepted",
    type: "boolean",
    flex: 1,
    cellClassName: "name-column--cell",
  },
];


const acceptedOpp = [
  {
    field: "name",
    headerName: "guide name",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
  },
  {
    field: "phoneNumber",
    headerName: "guide phonenumber",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
  },
  {
    field: "email",
    headerName: "guide email",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
  },
  {
    field: "image",
    headerName: "guide image",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
    renderCell: ImageRender,
  },
  {
    field: "description",
    headerName: "description",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "language",
    headerName: "language",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "accepted",
    headerName: "accepted",
    type: "boolean",
    flex: 1,
    cellClassName: "name-column--cell",
  },
];

export default function TouristPro() {
  const tableRef = useRef();
  const { authState } = useContext(AuthContext);
  const [opointments, setOpointments] = useState([]);

  const {
    sendRequest: sendGetOpiontmentsRequest,
    status: GetOpiontmentsRequestStatues,
    error: GetOpiontmentsRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendUpdateOpiontmentRequest,
    status: updateOpiontmentRequestStatues,
    error: updateOpiontmentRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendDeleteOpiontmentRequest,
    status: deleteOpiontmentRequestStatues,
    error: deleteOpiontmentRequestError,
  } = useHttpRequest();

  const asyncProcessRowUpdate = (row) => {
    const formData = new FormData();

    formData.append("language", row.language);
    formData.append("description", row.description);

    sendUpdateOpiontmentRequest(
      {
        url: `api/appointments/${row.id}`,
        method: "PUT",
        data: {
          language: row.language,
          description: row.description,
        },
      },
      (data) => {
        console.log(data);
      }
    );

    return row;
  };

  const handleAsyncDelete = async (id) => {
    sendDeleteOpiontmentRequest({
      url: `api/appointments/${id}`,
      method: "DELETE",
    });

    if (!(deleteOpiontmentRequestStatues && deleteOpiontmentRequestError)) {
      tableRef.current.handleDeleteClick(id);
    }
  };
  console.log("sdvczx");
  useEffect(() => {
    sendGetOpiontmentsRequest(
      { url: `api/appointments/tourist/${authState.info.id}` },
      (data) => {
        console.log(data);
        setOpointments(
          data.appointments
        );
      }
    );
  }, [sendGetOpiontmentsRequest, authState.info.id]);

  console.log(
    opointments
      .filter((opp) => opp.accepted)
      .map((opp) => ({
        ...opp.guide,
        ...opp,
      }))
  );

  const tourisData = {
    name: authState.info.name,
    email: authState.info.email,
    phone: authState.info.phoneNumber,
    location: authState.info?.location,
    langs: authState.info?.languages,
    description: authState.info?.description,
  };

  const ProStyles = {
    info: { color: theme.palette.text.primary, textAlign: "left", pb: 1.5 },
  };
  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Box m="50px" display="flex" justifyContent="center">
        <Card sx={{ width: "60%", height: "100%" }} elevation={3}>
          <Box height={300} width="100%" display="flex" p={5} mb={8}>
            <Box
              sx={{
                height: 300,
                width: 300,
                borderRadius: "50%",
                background: `url(${
                  authState.info?.image ? BaseURL + authState.info.image : img1
                })`,
                backgroundSize: "100% 100%",
              }}
            ></Box>
            <Box
              height={300}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              pl={3}
            >
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                color={theme.palette.primary.main}
                textAlign="left"
              >
                {tourisData.name}
              </Typography>
              <Typography variant="h5" sx={ProStyles.info}>
                {tourisData.email}
              </Typography>
              <Typography variant="h5" sx={ProStyles.info}>
                {tourisData.phone}
              </Typography>
              <Typography variant="h5" sx={ProStyles.info}>
                {tourisData.location}
              </Typography>
              <Box display="flex" alignItems="center" gap="5px" pb={1.5}>
                {tourisData.langs.map((lang, innerIndex) => (
                  <Typography
                    fontSize="14px"
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
              <Button href="/EditForm" sx={{ height: "30px",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      fontSize: "16px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      }}}>
              Edit
            </Button>
            </Box>
          </Box>

          <Box p={4}>
            <Typography variant="p">{tourisData.description}</Typography>
          </Box>
        </Card>
      </Box>
      
      <Typography fontSize='20px' color={theme.palette.primary.main} >
          Confirmed appointments
        </Typography>

      <Container>
        <Stack direction="row" maxWidth="100vw">
          <Table
            ref={tableRef}
            columns={acceptedOpp}
            initialRows={opointments.filter((opp) => opp.accepted).map((opp)=>({
              ...opp.guide,...opp
            }))}
            asyncProcessRowUpdate={asyncProcessRowUpdate}
            handleAsyncDelete={handleAsyncDelete}
            addFeature={false}
          />
        </Stack>
      </Container>

      <Typography fontSize='20px' marginTop='20px' color={theme.palette.primary.main} >
          Pendding appointments
        </Typography>
      <Container>
        <Stack direction="row" maxWidth="100vw">
          <Table
            ref={tableRef}
            columns={columns}
            initialRows={opointments.filter((opp) => !opp.accepted)}
            asyncProcessRowUpdate={asyncProcessRowUpdate}
            handleAsyncDelete={handleAsyncDelete}
            addFeature={false}
          />
        </Stack>
      </Container>
    </Stack>
  );
}