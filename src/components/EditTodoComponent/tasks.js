import React from "react";
import { Checkbox, Button, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export default function Tasks(props) {
    return props.tasks.map((task, i) => {
      return (
        <div key={task._id} className="tasks">
          <Checkbox
            checked={task.checked}
            onChange={() => props.changeTaskChecked(!task.checked, i)}
          />
          <TextField disabled={true} value={task.text}></TextField>
          <Button onClick={() => props.deleteTask(task._id)}><DeleteIcon/></Button>
        </div>
      );
    });
  }
