import React, { useState } from "react";
import { Checkbox, Button, TextField, DialogTitle, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteTaskDialog from "./deletetaskdialog";

export default function Tasks(props) {
  const [open, setOpen] = useState(false);

  const openWarn = () => {
    setOpen(true);
  };

  const closeWarn = () => {
    setOpen(false);
  };

  return props.tasks.map((task, i) => {
    return (
      <div key={task._id} className="tasks">
        <Checkbox
          checked={task.checked}
          onChange={() => props.changeTaskChecked(!task.checked, i)}
        />
        <TextField disabled={true} value={task.text}></TextField>
        <Button onClick={() => openWarn()}>
          <DeleteIcon />
        </Button>
        {/* <DeleteTaskDialog
          deleteTask={props.deleteTask}
          openWar={openWarn}
          closeWarn={closeWarn}
          open={open}
          task={task}
        /> */}
        {/* <Dialog
          onClose={() => closeWarn()}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete "{task.text}"?
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={() => closeWarn()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                props.deleteTask(task._id);
                closeWarn();
              }}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  });
}
