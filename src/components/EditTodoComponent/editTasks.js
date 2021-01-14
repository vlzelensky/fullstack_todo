import React from "react";
import { TextField, Checkbox } from "@material-ui/core";
export default function EditTasks(props) {
  return (
    props.editMode &&
    props.tasks.map((task, index) => {
      return (
        <div className="edit-box">
          <Checkbox
            onChange={(event) => props.changeTaskChecked(!task.checked, index)}
            checked={task.checked}
          ></Checkbox>
          <TextField
            onChange={(event) =>
              props.changeTaskText(event.target.value.trim(), index)
            }
            value={task.text}
          ></TextField>
        </div>
      );
    })
  );
}
