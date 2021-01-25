import React from "react";
import { Button, TextField, DialogTitle, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import EditTasks from "./editTasks";

export default function EditDialog(props) {
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={props.open}
      onClose={props.activateEditMode}
    >
      <DialogTitle id="simple-dialog-title">
        <TextField
          onChange={(event) => props.editTitle(event.target.value)}
          defaultValue={props.title}
        ></TextField>
      </DialogTitle>
      <EditTasks
        editTask={props.editTask}
        editMode={props.open}
        tasks={props.tasks}
      />
      <DialogActions>
        <Button className="btn cancel-btn" onClick={props.activateEditMode}>
          Cancel
        </Button>
        <Button
          className="btn"
          disabled={!props.isChangesExist}
          onClick={props.saveChanges}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
