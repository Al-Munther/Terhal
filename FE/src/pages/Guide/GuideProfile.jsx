import { Stack, Card, Box, Typography, Container, FormControl, Select, OutlinedInput, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import img1 from "./defualt.jpg";
import theme from "../../theme/theme";
import Navbar from "../../layout/NavBar";
import Table from "../../components/tables/Table";
import { opointmentsContext } from "../../contexts/OpointmentsContext";
import useHttpRequest from "../../hooks/useHttpRequest";
import AuthContext from "../../contexts/Auth/AuthContext";
import { useGridApiContext } from "@mui/x-data-grid";
import { citiesContext } from "../../contexts/CitiesContext";

const BaseURL = "http://localhost:5000/";
const RenderTourist = (params) => {
  return <p>{params.value.name}</p>;
};

const columns = [
  {
    field: "description",
    headerName: "description",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
  },
  {
    field: "tourist",
    headerName: "tourist",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
    renderCell: RenderTourist,
  },
  {
    field: "language",
    headerName: "language",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: false,
  },
  {
    field: "accepted",
    headerName: "accepted",
    type: "boolean",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
];

const CitiesEditCell = ({ id, value, field }) => {
  const apiRef = useGridApiContext();
  const { cities } = useContext(citiesContext);
  // const [city,setCity] = useState("");

  const handleChange = (event) => {
    apiRef.current.setEditCellValue({ id, field, value: event.target.value });
  };

  return (
    <FormControl>
      <Select
        name="cities"
        // value=c}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => selected}
      >
        {false ? (
          <></>
        ) : (
          cities?.map((city, index) => {
            return (
              <MenuItem key={index} value={city.id}>
                {city.name}
              </MenuItem>
            );
          })
        )}
      </Select>
    </FormControl>
  );
};


export default function GuideProfile() {
  const tableRef = useRef();
  const { authState } = useContext(AuthContext);
  const [opointments,setOpointments] = useState([]);

  console.log(opointments)

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

    

    sendUpdateOpiontmentRequest(
      {
        url: `api/appointments/${row.id}`,
        method: "PUT",
        data: {
            accepted:row.accepted,
        },
      },
      (data) => {}
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

  useEffect(() => {
    sendGetOpiontmentsRequest(
      { url: `api/appointments/guide/${authState.info.id}` },
      (data) => {
        setOpointments(data.appointments);
      }
    );
  }, [sendGetOpiontmentsRequest, setOpointments, authState.info.id]);

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
            </Box>
          </Box>

          <Box p={4}>
            <Typography variant="p">{tourisData.description}</Typography>
          </Box>
        </Card>
      </Box>

      <Box>
        <Container>
          <Stack direction="row" maxWidth="100vw">
            <Table
              ref={tableRef}
              columns={columns}
              initialRows={opointments}
              asyncProcessRowUpdate={asyncProcessRowUpdate}
              handleAsyncDelete={handleAsyncDelete}
              addFeature={false}
            />
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
}
