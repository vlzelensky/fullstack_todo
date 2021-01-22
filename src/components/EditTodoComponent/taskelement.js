import React, { useState } from "react";
import {
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteTaskDialog from "./deletetaskdialog";

export default function TaskElement(props) {
  const [open, setOpen] = useState(false);

  const openWarn = () => {
    setOpen(true);
  };

  const closeWarn = () => {
    setOpen(false);
  };
  const task = props.task;
  const i = props.i;
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
      <DeleteTaskDialog
        deleteTask={props.deleteTask}
        openWar={openWarn}
        closeWarn={closeWarn}
        open={open}
        task={task}
      />
    </div>
  );
}
