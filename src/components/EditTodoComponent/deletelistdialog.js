import React from "react";
import { Button, DialogTitle, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

export default function DeleteListDialog(props) {
  return (
    <Dialog
      onClose={() => props.closeDeleteWarn()}
      open={props.deleteWarn}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete "{props.title}"?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => props.closeDeleteWarn()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.deleteList()} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
