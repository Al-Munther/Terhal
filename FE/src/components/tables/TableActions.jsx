import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function TableActions(
  rowModesModel,
  handleSaveClick,
  handleAsyncDelete,
  handleCancelClick,
  handleEditClick,
  { id }
) {
  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  if (isInEditMode) {
    return [
      <GridActionsCellItem
        icon={<SaveIcon />}
        label="Save"
        onClick={() => handleSaveClick(id)}
      />,
      <GridActionsCellItem
        icon={<CancelIcon />}
        label="Cancel"
        className="textPrimary"
        onClick={() => handleCancelClick(id)}
        color="inherit"
      />,
    ];
  }

  return [
    <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      className="textPrimary"
      onClick={() => handleEditClick(id)}
      color="inherit"
    />,
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={() => handleAsyncDelete(id)}
      color="inherit"
    />,
  ];
};

export default TableActions;
