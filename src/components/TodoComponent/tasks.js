import React from "react";
import { Checkbox } from "@material-ui/core";
import api from "../../services/api";

export default function Tasks(props) {
  const tasks = props.tasks;

  async function toggleDone(text, checked, _id) {
    try {
      api().put("/api/editlist/" + _id, {
        editing: [
          {
            text,
            checked,
            _id,
          },
        ],
      });
    } catch (e) {
      console.warn(e);
    }
  }
  return tasks.map((task) => {
    return (
      <div key={task._id} className="task-container">
        <Checkbox
          defaultChecked={task.checked}
          onChange={(event) => toggleDone(task.text, !task.checked, task._id)}
        />
        <li className="task">{task.text}</li>
      </div>
    );
  });
}
