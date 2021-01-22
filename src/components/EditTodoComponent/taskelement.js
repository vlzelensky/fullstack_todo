import React, { useState } from "react";
import { Checkbox, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteTaskDialog from "./deletetaskdialog";
import api from "../../services/api";

export default function TaskElement(props) {
  const [open, setOpen] = useState(false);

  const openWarn = () => {
    setOpen(true);
  };

  const closeWarn = () => {
    setOpen(false);
  };
  const task = props.task;

  async function toggleDone(text, checked, _id) {
    try {
      api().put("/api/editlist/" + _id, {
        editing: [
          {
            text,
            checked,
            _id,
          },
        ],
      });
    } catch (e) {
      console.warn(e);
    }
  }

  

  return (
    <div key={task._id} className="tasks">
      <Checkbox
        checked={task.checked}
        onChange={() => {
          toggleDone(task.text, !task.checked, task._id)
          props.handleCheck(task._id)
        }}
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
