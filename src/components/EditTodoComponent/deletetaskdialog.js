import React from "react";
import { Button, DialogTitle, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

export default function DeleteTaskDialog(props) {
  return (
    <Dialog
      onClose={() => props.closeWarn()}
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete "{props.task.text}"?
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeWarn()} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.deleteTask(props.task._id);
            props.closeWarn()
          }}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
