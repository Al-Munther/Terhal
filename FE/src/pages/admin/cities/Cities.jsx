import React, { useContext, useEffect, useRef } from "react";
import Table from "../../../components/tables/Table";
import { citiesContext } from "../../../contexts/CitiesContext";
import useHttpRequest from "../../../hooks/useHttpRequest";
import {
  Box,
  Chip,
  FormControl,
  Input,
  OutlinedInput,
  Select,
  Stack,
  useTheme,
} from "@mui/material";
import Navbar from "../../../layout/NavBar";
import DashbourdSidebar from "../../../layout/DashboardSidebar";
import { useGridApiContext } from "@mui/x-data-grid";
import { guidesContext } from "../../../contexts/GuidesContext";
import { MenuItem } from "react-pro-sidebar";
import { placesContext } from "../../../contexts/PlacesContext";
import { restraunatsContext } from "../../../contexts/RestraunatsContext";
import { baseURL } from "../../../hooks/useAxios";

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
const GuidesEditCell = ({ id, value, field }) => {
  const apiRef = useGridApiContext();
  const { guides, setGuides } = useContext(guidesContext);

  const handleChange = (event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const { sendRequest, status, error } = useHttpRequest();

  useEffect(() => {
    if (guides.length === 0) {
      sendRequest({ url: "api/guides" }, (data) => setGuides(data));
    }
  }, [guides, setGuides, sendRequest]);

  return (
    <FormControl>
      <Select
        name="guides"
        // value={formData.capacity}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <Chip label={selected} />
          </Box>
        )}
      >
        {status === "loading" ? (
          <></>
        ) : (
          guides.map((guide, index) => {
            return (
              <MenuItem key={index} value={guide.id}>
                {guide.name}
              </MenuItem>
            );
          })
        )}
      </Select>
    </FormControl>
  );
};

const PlacesEditCell = ({ id, value, field }) => {
  const apiRef = useGridApiContext();
  const { places, setPlaces } = useContext(placesContext);

  const handleChange = (event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const { sendRequest, status, error } = useHttpRequest();

  useEffect(() => {
    if (places.length === 0) {
      sendRequest({ url: "api/places" }, (data) => setPlaces(data));
    }
  }, [places, setPlaces, sendRequest]);

  return (
    <FormControl>
      <Select
        name="places"
        // value={formData.capacity}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <Chip label={selected} />
          </Box>
        )}
      >
        {status === "loading" ? (
          <></>
        ) : (
          places.map((place, index) => {
            return (
              <MenuItem key={index} value={place.id}>
                {place.name}
              </MenuItem>
            );
          })
        )}
      </Select>
    </FormControl>
  );
};

const RestaurantsEditCell = ({ id, value, field }) => {
  const apiRef = useGridApiContext();
  const { restaurants, setRestaurants } = useContext(restraunatsContext);

  const handleChange = (event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const { sendRequest, status, error } = useHttpRequest();

  useEffect(() => {
    if (restaurants.length === 0) {
      sendRequest({ url: "api/restaurants" }, (data) => setRestaurants(data));
    }
  }, [restaurants, setRestaurants, sendRequest]);

  return (
    <FormControl>
      <Select
        name="restaurants"
        // value={formData.capacity}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <Chip label={selected} />
          </Box>
        )}
      >
        {status === "loading" ? (
          <></>
        ) : (
          restaurants.map((restaurant, index) => {
            return (
              <MenuItem key={index} value={restaurant.id}>
                {restaurant.name}
              </MenuItem>
            );
          })
        )}
      </Select>
    </FormControl>
  );
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
    field: "weather",
    headerName: "weather",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
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

const Cities = () => {
  const tableRef = useRef();
  const theme = useTheme();
  const { cities, setCities, updateCity, addCity, deleteCity } =
    useContext(citiesContext);

  const {
    sendRequest: sendGetCitiesRequest,
    status: GetCitiesRequestStatues,
    error: GetCitiesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendUpdateCityRequest,
    status: updateCityRequestStatues,
    error: updateCityRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendAddCityRequest,
    status: addCityRequestStatues,
    error: addCityRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendDeleteCityRequest,
    status: deleteCityRequestStatues,
    error: deleteCityRequestError,
  } = useHttpRequest();

  const asyncProcessRowUpdate = (row) => {
    const formData = new FormData();

    formData.append("name", row.name);
    formData.append("description", row.description);
    formData.append("weather", row.weather);
    formData.append("image", row.image);

    if (row.isNew) {
      sendAddCityRequest(
        {
          url: "api/cities",
          method: "POST",
          data: formData,
        },
        (data) => {}
      );
    } else {
      console.log(row)
      sendUpdateCityRequest(
        {
          url: `api/cities/${row.id}`,
          method: "PUT",
          data: formData,
        },
        (data) => {console.log(data)}
      );
    }

    return row;
  };

  const handleAsyncDelete = async (id) => {
    sendDeleteCityRequest({
      url: `api/cities/${id}`,
      method: "DELETE",
    });

    if (!(deleteCityRequestStatues && deleteCityRequestError)) {
      tableRef.current.handleDeleteClick(id);
    }
  };

  useEffect(() => {
    sendGetCitiesRequest({ url: "api/cities/" }, (data) => {
      setCities(data.cities);
    });
  }, [sendGetCitiesRequest, setCities]);

  console.log(cities);

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Stack direction="row" maxWidth="100vw">
        <DashbourdSidebar />
        <Table
          ref={tableRef}
          columns={columns}
          initialRows={cities}
          asyncProcessRowUpdate={asyncProcessRowUpdate}
          handleAsyncDelete={handleAsyncDelete}
        />
      </Stack>
    </Stack>
  );
};

export default Cities;
