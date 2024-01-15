import React, { useContext, useEffect, useRef } from "react";
import Table from "../../../components/tables/Table";
import { opointmentsContext } from "../../../contexts/OpointmentsContext";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { Stack, useTheme } from "@mui/material";
import Navbar from "../../../layout/NavBar";
import DashbourdSidebar from "../../../layout/DashboardSidebar";

const RenderTourist = (params)=>{
  return <p>{params.value.name}</p>
}

const RenderGuide = (params) => {
  return <p>{params.value.name}</p>;
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
    editable: true,
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

const Opiontments = () => {
  const tableRef = useRef();
  const theme = useTheme()
  const {
    opointments,
    setOpointments,
    updateOpiontment,
    addOpiontment,
    deleteOpiontment,
  } = useContext(opointmentsContext);

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
    sendRequest: sendAddOpiontmentRequest,
    status: addOpiontmentRequestStatues,
    error: addOpiontmentRequestError,
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

    if (row.isNew) {
      sendAddOpiontmentRequest(
        {
          url: "api/appointments",
          method: "POST",
          data: {
            language: row.language,
            description: row.description,
            tourist:row.tourist.id,
            guide:row.guide.id,
            accepted:row.accepted
          },
        },
        (data) => {}
      );
    } else {
      sendUpdateOpiontmentRequest(
        {
          url: `api/appointments/${row.id}`,
          method: "PUT",
          data: {
            language: row.language,
            description: row.description,
            accepted: row.accepted,
          },
        },
        (data) => {}
      );
    }

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
    sendGetOpiontmentsRequest({ url: "api/appointments/" }, (data) => {
      setOpointments(data.appointments);
    });
  }, [sendGetOpiontmentsRequest, setOpointments]);

  console.log(opointments);

  return (
    <Stack>
      <Navbar color={theme.palette.text.primary} />
      <Stack direction="row" maxWidth="100vw">
        <DashbourdSidebar />
        <Table
          ref={tableRef}
          columns={columns}
          initialRows={opointments}
          asyncProcessRowUpdate={asyncProcessRowUpdate}
          handleAsyncDelete={handleAsyncDelete}
        />
      </Stack>
    </Stack>
  );
};

export default Opiontments;
