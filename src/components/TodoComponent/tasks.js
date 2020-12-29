import React from "react";
import {Checkbox} from "@material-ui/core"

export default function Tasks(props) {
  return props.tasks.map((task) => (
    <>
      {task.id_list === props.list._id && (
        <div className="task-container">
          <Checkbox />
          <li className="task">{task.text}</li>
        </div>
      )}
    </>
  ));
}
