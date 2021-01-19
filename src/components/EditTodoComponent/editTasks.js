import React from "react";
import { TextField, Checkbox } from "@material-ui/core";
export default function EditTasks(props) {
  return (
    props.editMode &&
    props.tasks.map((task) => {
      return (
        <div key={task._id} className="edit-box">
          <Checkbox
            onChange={(event) =>
              props.editTask(task._id, {checked: event.target.checked})
            }
            defaultChecked={task.checked}
          ></Checkbox>
          <TextField
            onChange={(event) =>
              props.editTask(task._id, {text: event.target.value})
            }
            defaultValue={task.text}
          ></TextField>
        </div>
      );
    })
  );
}
