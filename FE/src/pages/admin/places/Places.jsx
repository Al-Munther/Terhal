import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "../../../components/tables/Table";
import { placesContext } from "../../../contexts/PlacesContext";
import useHttpRequest from "../../../hooks/useHttpRequest";
import {
  Box,
  Chip,
  FormControl,
  Input,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  useTheme,
} from "@mui/material";
import Navbar from "../../../layout/NavBar";
import DashbourdSidebar from "../../../layout/DashboardSidebar";
import { baseURL } from "../../../hooks/useAxios";
import { useGridApiContext } from "@mui/x-data-grid";
import { citiesContext } from "../../../contexts/CitiesContext";
import axios from "axios";

const ImageRender = (params) => {
  return (
    <img src={`${baseURL}${params.value}`} alt={params.value} width="100%" />
  );
};

const ImageEdit = ({ id, field, value }) => {
  const apiRef = useGridApiContext();
  const handleRef = (element) => {
    if (element) {
      const input = element.querySelector(`input[value="${value}"]`);

      input?.focus();
    }
  };

  const handleChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <Input
      ref={handleRef}
      type="file"
      onChange={(e) => handleChange(e.target.files[0])}
    />
  );
};

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
        renderValue={(selected) => selected.name}
      >
        {false ? (
          <></>
        ) : (
          cities?.map((city, index) => {
            return (
              <MenuItem key={index} value={city}>
                {city.name}
              </MenuItem>
            );
          })
        )}
      </Select>
    </FormControl>
  );
};

const RenderCity = (params) => {
  return <p>{params.value?.name}</p>;
};

const columns = [
  {
    field: "name",
    headerName: "name",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "description",
    headerName: "description",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "location",
    headerName: "location",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "city",
    headerName: "city",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
    renderEditCell: CitiesEditCell,
    renderCell:RenderCity
  },
  {
    field: "image",
    headerName: "image",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
    renderCell: ImageRender,
    renderEditCell: ImageEdit,
  },
];

const Places = () => {
  const tableRef = useRef();
  const theme = useTheme();
  const { setCities, cities } = useContext(citiesContext);
  const { places, setPlaces, updatePlaces, addPlaces, deletePlaces } =
    useContext(placesContext);

  const {
    sendRequest: sendGetPlacesRequest,
    status: GetPlacesRequestStatues,
    error: GetPlacesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendGetCitiesRequest,
    status: GetCitiesRequestStatues,
    error: GetCitiesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendUpdatePlacesRequest,
    status: updatePlacesRequestStatues,
    error: updatePlacesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendAddPlacesRequest,
    status: addPlacesRequestStatues,
    error: addPlacesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendDeletePlacesRequest,
    status: deletePlacesRequestStatues,
    error: deletePlacesRequestError,
  } = useHttpRequest();

  const asyncProcessRowUpdate = (row) => {
    const formData = new FormData();

    formData.append("name", row.name);
    formData.append("description", row.description);
    formData.append("city", row.city.id);
    formData.append("image", row.image);
    formData.append("location", row.location);

    console.log(row)

    if (row.isNew) {
      sendAddPlacesRequest(
        {
          url: "api/places",
          method: "POST",
          data: formData,
        },
        (data) => {
          console.log(data);
        }
      );
    } else {
      sendUpdatePlacesRequest(
        {
          url: `api/places/${row.id}`,
          method: "PUT",
          data: formData,
        },
        (data) => {}
      );
    }

    return row;
  };

  const handleAsyncDelete = async (id) => {
    sendDeletePlacesRequest({
      url: `api/places/${id}`,
      method: "DELETE",
    });

    if (!(deletePlacesRequestStatues && deletePlacesRequestError)) {
      tableRef.current.handleDeleteClick(id);
    }
  };

  useEffect(() => {
    sendGetPlacesRequest({ url: "api/places/" }, (data) => {
      setPlaces(data.places);
    });

    // .map((place)=>({...place,city:place.city.name}))

    if (cities.length === 0) {
      sendGetCitiesRequest({ url: "api/cities" }, (data) =>
        setCities(data.cities)
      );
    }
  }, [
    sendGetPlacesRequest,
    setPlaces,
    sendGetCitiesRequest,
    cities,
    setCities,
  ]);

  console.log(places);

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Stack direction="row" maxWidth="100vw">
        <DashbourdSidebar />
        <Table
          ref={tableRef}
          columns={columns}
          initialRows={places}
          asyncProcessRowUpdate={asyncProcessRowUpdate}
          handleAsyncDelete={handleAsyncDelete}
        />
      </Stack>
    </Stack>
  );
};

export default Places;
