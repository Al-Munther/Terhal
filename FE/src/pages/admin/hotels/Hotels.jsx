import React, { useContext, useEffect, useRef } from "react";
import Table from "../../../components/tables/Table";
import { hotelsContext } from "../../../contexts/HotelsContext";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { FormControl, Input, MenuItem, OutlinedInput, Select, Stack, useTheme } from "@mui/material";
import Navbar from "../../../layout/NavBar";
import DashbourdSidebar from "../../../layout/DashboardSidebar";
import { baseURL } from "../../../hooks/useAxios";
import { useGridApiContext } from "@mui/x-data-grid";
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

const Hotels = () => {
  const tableRef = useRef();
  const theme = useTheme()
  const { hotels, setHotels, updateHotel, addHotel, deleteHotel } =
    useContext(hotelsContext);
      const { setCities, cities } = useContext(citiesContext);


  const {
    sendRequest: sendGetHotelsRequest,
    status: GetHotelsRequestStatues,
    error: GetHotelsRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendUpdateHotelRequest,
    status: updateHotelRequestStatues,
    error: updateHotelRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendGetCitiesRequest,
    status: GetCitiesRequestStatues,
    error: GetCitiesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendAddHotelRequest,
    status: addHotelRequestStatues,
    error: addHotelRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendDeleteHotelRequest,
    status: deleteHotelRequestStatues,
    error: deleteHotelRequestError,
  } = useHttpRequest();

  const asyncProcessRowUpdate = (row) => {
    const formData = new FormData();

    formData.append("name", row.name);
    formData.append("description", row.description);
    formData.append("location", row.location);
    formData.append("image", row.image);
    formData.append("city", row.city.id);

    if (row.isNew) {
      sendAddHotelRequest(
        {
          url: "api/hotels/",
          method: "POST",
          data: formData,
        },
        (data) => {console.log(data)}
      );
    } else {
      sendUpdateHotelRequest(
        {
          url: `api/hotels/${row.id}`,
          method: "PUT",
          data: formData,
        },
        (data) => {console.log(data)}
      );
    }

    console.log(updateHotelRequestError)

    return row;
  };

  const handleAsyncDelete = async (id) => {
    sendDeleteHotelRequest({
      url: `api/hotels/${id}`,
      method: "DELETE",
    });

    if (!(deleteHotelRequestStatues && deleteHotelRequestError)) {
      tableRef.current.handleDeleteClick(id);
    }
  };

  useEffect(() => {
    sendGetHotelsRequest({ url: `api/hotels/` }, (data) => {
      setHotels(data.hotels);
    });

     if (cities.length === 0) {
       sendGetCitiesRequest({ url: "api/cities" }, (data) =>
         setCities(data.cities)
       );
     }
  }, [sendGetHotelsRequest, setHotels]);

  console.log(hotels)

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Stack direction="row" maxWidth="100vw">
        <DashbourdSidebar />
        <Table
          ref={tableRef}
          columns={columns}
          initialRows={hotels}
          asyncProcessRowUpdate={asyncProcessRowUpdate}
          handleAsyncDelete={handleAsyncDelete}
        />
      </Stack>
    </Stack>
  );
};

export default Hotels;
