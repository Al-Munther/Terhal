import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableToolBar from "./TableToolBar";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { useImperativeHandle } from "react";
import TableActions from "./TableActions";
import { LinearProgress } from "@mui/material";

TableToolBar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

function Table(
  {
    initialRows,
    columns,
    handleAsyncSave,
    asyncProcessRowUpdate,
    handleAsyncDelete,
    onAddClick,
    onEditClick,
    addFeature = true,
  },
  ref
) {
  const [rows, setRows] = React.useState(null);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => {
    if (onEditClick) {
      onEditClick(findRowById(id));
    } else {
      console.log(rows);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log(rows);
  };

  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    asyncProcessRowUpdate(newRow);
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  useEffect(() => {
    setRows(initialRows);
    console.log(12344);
  }, [initialRows]);

  columns = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "actions",
      width: 100,
      cellClassName: "actions",
      getActions: TableActions.bind(
        null,
        rowModesModel,
        handleSaveClick,
        handleAsyncDelete,
        handleCancelClick,
        handleEditClick
      ),
    },
  ];

  const findRowById = (id) => {
    return rows.find((row) => row.id === id);
  };

  useImperativeHandle(ref, () => ({
    handleEditClick: (id) => handleEditClick(id),
    handleSaveClick: (id) => handleSaveClick(id),
    handleDeleteClick: (id) => handleDeleteClick(id),
    handleCancelClick: (id) => handleCancelClick(id),
    findRowById: (id) => findRowById(id),
  }));

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        sx={{ borderRadius: "0" }}
        rows={rows ? rows : []}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: TableToolBar.bind(null, { onAddClick, addFeature }),
          LoadingOverlay: LinearProgress,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        loading={!Boolean(rows)}
      />
    </Box>
  );
}

export default forwardRef(Table);
