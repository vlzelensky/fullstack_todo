import React, {useEffect} from "react";
import { Checkbox } from "@material-ui/core";
import api from "../../services/api";

export default function Tasks(props) {
  console.log(props.tasks)
  const tasks = props.tasks.sort((a, b) => a.checked - !b.checked)

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
          className="checkbox"
          defaultChecked={task.checked}
          onChange={(event) => toggleDone(task.text, !task.checked, task._id)}
        />
        <li className="task task-input">{task.text}</li>
      </div>
    );
  });
}
