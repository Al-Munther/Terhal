import React, { useContext, useEffect, useRef } from "react";
import Table from "../../../components/tables/Table";
import { guidesContext } from "../../../contexts/GuidesContext";
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

const RenderCity = (params) => {return <p>{params.value?.name}</p>};


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
    field: "email",
    headerName: "email",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "password",
    headerName: "password",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "phonenumber",
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
    field: "languages",
    headerName: "languages",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "available",
    headerName: "available",
    type: "boolean",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "drivingLicense",
    headerName: "drivingLicense",
    type: "boolean",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  {
    field: "price",
    headerName: "price",
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
    renderCell: RenderCity,
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


const Guides = () => {
  const tableRef = useRef();
  const theme = useTheme();
  const { guides, setGuides, updateGuide, addGuide, deleteGuide } =
    useContext(guidesContext);
      const { setCities, cities } = useContext(citiesContext);


  const {
    sendRequest: sendGetGuidesRequest,
    status: GetGuidesRequestStatues,
    error: GetGuidesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendUpdateGuideRequest,
    status: updateGuideRequestStatues,
    error: updateGuideRequestError,
  } = useHttpRequest();
  const {
    sendRequest: sendGetCitiesRequest,
    status: GetCitiesRequestStatues,
    error: GetCitiesRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendAddGuideRequest,
    status: addGuideRequestStatues,
    error: addGuideRequestError,
  } = useHttpRequest();

  const {
    sendRequest: sendDeleteGuideRequest,
    status: deleteGuideRequestStatues,
    error: deleteGuideRequestError,
  } = useHttpRequest();

  const asyncProcessRowUpdate = (row) => {
    const formData = new FormData();

    formData.append("name", row.name);
    formData.append("description", row.description);
    formData.append("image", row.image);
    formData.append("email", row.email);
    formData.append("password", row.password);
    formData.append("price", row.price);
    formData.append("drivingLicense", row.drivingLicense);
    formData.append("available", row.available);
    formData.append("phoneNumber", row.phoneNumber);
    formData.append("languages", row.languages);
    formData.append("location", row.location);
    formData.append("city", row.city.id);

    if (row.isNew) {
      console.log(row);
      sendAddGuideRequest(
        {
          url: "api/guides",
          method: "POST",
          data: formData,
        },
        (data) => {
          console.log(data);
        }
      );
    } else {
      sendUpdateGuideRequest(
        {
          url: `api/guides/${row.id}`,
          method: "PUT",
          data: formData,
        },
        (data) => {console.log(data)}
      );
    }

    return row;
  };

  console.log(updateGuideRequestError)

  const handleAsyncDelete = async (id) => {
    sendDeleteGuideRequest({
      url: `api/guides/${id}`,
      method: "DELETE",
    });

    if (!(deleteGuideRequestStatues && deleteGuideRequestError)) {
      tableRef.current.handleDeleteClick(id);
    }
  };

  useEffect(() => {
    sendGetGuidesRequest({ url: "api/guides" }, (data) => {
      console.log(data);
      setGuides(
        data.guides
      );
    });

     if (cities.length === 0) {
       sendGetCitiesRequest({ url: "api/cities" }, (data) =>
         setCities(data.cities)
       );
     }
  }, [sendGetGuidesRequest, setGuides]);

  // .map((guide)=>({...guide,city:guide.city.name}))

  console.log(guides);

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Stack direction="row" maxWidth="100vw">
        <DashbourdSidebar />
        <Table
          ref={tableRef}
          columns={columns}
          initialRows={guides}
          asyncProcessRowUpdate={asyncProcessRowUpdate}
          handleAsyncDelete={handleAsyncDelete}
        />
      </Stack>
    </Stack>
  );
};

export default Guides;
