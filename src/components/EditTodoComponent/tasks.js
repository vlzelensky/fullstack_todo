import React from "react";
import { Checkbox, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export default function Tasks(props) {
    return props.tasks.map((task, i) => {
      return (
        <div className="tasks">
          <Checkbox
            checked={task.checked}
            onChange={() => props.changeTaskChecked(!task.checked, i)}
          />
          <span>{task.text}</span>
          <Button onClick={() => props.deleteTask(task._id)}><DeleteIcon/></Button>
        </div>
      );
    });
  }
