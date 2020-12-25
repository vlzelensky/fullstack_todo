import React from "react";
import { TextField } from "@material-ui/core";

export default function EditableTitle(props) {
  return (
    <TextField
      value={props.title}
      onChange={props.changeTitle}
      onBlur={() => {
        if (props.title !== "") {
          props.setEditMode(!props.editMode);
        }
      }}
    ></TextField>
  );
}
