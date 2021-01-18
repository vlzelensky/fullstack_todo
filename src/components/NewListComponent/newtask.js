import React from "react";
import { Checkbox, TextField } from "@material-ui/core";

export default function NewTask(props) {
  return props.tasks.map((todoItem, index) => {
    return (
      <div key={index}>
        <Checkbox
          onClick={() => {
            todoItem.checked = !todoItem.checked;
            props.saveTaskValue(todoItem, index);
          }}
        />
        <TextField
          placeholder="New task"
          onChange={(event) => {
            todoItem.text = event.target.value.trim();
            props.saveTaskValue(todoItem, index);
          }}
        />
      </div>
    );
  });
}
