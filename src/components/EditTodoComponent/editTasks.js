import React from "react";
import { TextField, Checkbox } from "@material-ui/core";
export default function EditTasks(props) {
  return (
    props.editMode &&
    props.tasks.map((task) => {
      return (
        <div className="edit-box">
          <Checkbox
            onChange={(event) =>
              props.addEditedChecked(task.text, task._id, event.target.checked)
            }
            defaultChecked={task.checked}
          ></Checkbox>
          <TextField
            onChange={(event) =>
              props.addEditedText(event.target.value, task._id, task.checked)
            }
            defaultValue={task.text}
          ></TextField>
        </div>
      );
    })
  );
}
