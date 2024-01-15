import React, { useContext, useEffect, useRef } from "react";
import Table from "../../../components/tables/Table";
import { restraunatsContext } from "../../../contexts/RestraunatsContext";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { FormControl, Input, MenuItem, OutlinedInput, Select, Stack, useTheme } from "@mui/material";
import Navbar from "../../../layout/NavBar";
import DashbourdSidebar from "../../../layout/DashboardSidebar";
import { useGridApiContext } from "@mui/x-data-grid";
import { baseURL } from "../../../hooks/useAxios";
import { citiesContext } from "../../../contexts/CitiesContext";

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

const Restruanats = () => {
  const tableRef = useRef();
  const theme = useTheme();
    const { setCities, cities } = useContext(citiesContext);

  const {
    restraunats,
    setRestraunats,
    updateRestruanats,
    addRestruanats,
    deleteRestruanats,
  } = useContext(restraunatsContext);

  const {
    sendRequest: sendGetRestruanatsRequest,
    status: GetRestruanatsRequestStatues,
    error: GetRestruanatsRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendUpdateRestruanatsRequest,
    status: updateRestruanatsRequestStatues,
    error: updateRestruanatsRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendGetCitiesRequest,
    status: GetCitiesRequestStatues,
    error: GetCitiesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendAddRestruanatsRequest,
    status: addRestruanatsRequestStatues,
    error: addRestruanatsRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendDeleteRestruanatsRequest,
    status: deleteRestruanatsRequestStatues,
    error: deleteRestruanatsRequestError,
  } = useHttpRequest();

  const asyncProcessRowUpdate = (row) => {
    const formData = new FormData();

    formData.append("name", row.name);
    formData.append("description", row.description);
    formData.append("image", row.image);
    formData.append("location", row.location);
    formData.append("city", row.city.id);

    if (row.isNew) {
      
      sendAddRestruanatsRequest(
        {
          url: "api/restaurants",
          method: "POST",
          data: formData,
        },
        (data) => {console.log(data)}
      );
    } else {
      sendUpdateRestruanatsRequest(
        {
          url: `api/restaurants/${row.id}`,
          method: "PUT",
          data: formData,
        },
        (data) => {console.log(data)}
      );
    }

    return row;
  };

  const handleAsyncDelete = async (id) => {
    sendDeleteRestruanatsRequest({
      url: `api/restaurants/${id}`,
      method: "DELETE",
    });

    if (!(deleteRestruanatsRequestStatues && deleteRestruanatsRequestError)) {
      tableRef.current.handleDeleteClick(id);
    }
  };

  useEffect(() => {
    sendGetRestruanatsRequest({ url: "api/restaurants" }, (data) => {
      setRestraunats(data.restaurants);
    });
     if (cities.length === 0) {
       sendGetCitiesRequest({ url: "api/cities" }, (data) =>
         setCities(data.cities)
       );
     }
  }, [sendGetRestruanatsRequest, setRestraunats]);

  console.log(restraunats);

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Stack direction="row" maxWidth="100vw">
        <DashbourdSidebar />
        <Table
          ref={tableRef}
          columns={columns}
          initialRows={restraunats}
          asyncProcessRowUpdate={asyncProcessRowUpdate}
          handleAsyncDelete={handleAsyncDelete}
        />
      </Stack>
    </Stack>
  );
};

export default Restruanats;
