import React from "react";
import { Checkbox, TextField} from "@material-ui/core";

export default function Tasks(props) {
  return props.tasks.map((task) => {
    return (
      <div>
        <Checkbox checked={task.checked} />
        <TextField value={task.text}></TextField>
      </div>
    );
  });
}
