import React from "react";
import { Checkbox, TextField } from "@material-ui/core";

export default function NewTask(props) {
  return props.tasks.map((todoItem) => {
     return (
      <div>
        <Checkbox
          onChange={() => {
            todoItem.checked = !todoItem.checked;
          }}
        />
        <TextField
          onChange={(event) => {
            todoItem.text = event.target.value.trim();
            todoItem.checked = false;
          }}
        />
      </div>
    );
  });
}
