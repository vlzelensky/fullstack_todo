import React from "react";
import { Checkbox } from "@material-ui/core";

export default function Tasks(props) {
  const tasks = props.tasks;
  return tasks.map((task) => {
    return (
      <div className="task-container">
        <Checkbox checked={task.checked} />
        <li className="task">{task.text}</li>
      </div>
    );
  });
}
