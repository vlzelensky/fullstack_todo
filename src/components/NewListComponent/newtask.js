import React from "react";
import { Checkbox, TextField } from "@material-ui/core";

export default function NewTask(props) {
  return props.tasks.map((todoItem, index) => {
    return (
      <div className="newtask-container" key={index}>
        <Checkbox
          className="checkbox"
          onClick={() => {
            todoItem.checked = !todoItem.checked;
            props.saveTaskValue(todoItem, index);
          }}
        />
        <TextField
          className="task-input"
          placeholder="New task"
          onBlur={(event) => props.saveNewTaskOnBlur()}
          onChange={(event) => {
            todoItem.text = event.target.value.trim();
            props.saveTaskValue(todoItem, index);
          }}
        />
      </div>
    );
  });
}
