import React, { useState } from "react";
import { Button, TextField, DialogTitle, Dialog } from "@material-ui/core";
import EditTasks from "./editTasks";

export default function EditDialog(props) {
  const [editMode, setEditMode] = useState(false);

  function handleClose() {
    setEditMode(false);
  }

  function activateEditMode() {
    setEditMode(true);
  }

  return (
    <Dialog
      onClose={() => handleClose()}
      aria-labelledby="simple-dialog-title"
      open={editMode}
    >
      <DialogTitle id="simple-dialog-title">
        <TextField
          onChange={(event) => props.editTitle(event.target.value)}
          defaultValue={props.title}
        ></TextField>
      </DialogTitle>
      <EditTasks
        editTask={props.editTask}
        editMode={editMode}
        tasks={props.tasks}
      />
      <Button onClick={activateEditMode}>Cancel</Button>
      <Button disabled={!props.isChangesExist} onClick={props.saveChanges}>
        Save
      </Button>
    </Dialog>
  );
}
