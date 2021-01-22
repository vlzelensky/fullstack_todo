import React from "react";
import TaskElement from "./taskelement"

export default function Tasks(props) {


  return props.tasks.map((task, i) => {
    return (
      <TaskElement handleCheck={props.handleCheck} key={task._id} task={task} i={i} deleteTask={props.deleteTask} />
    );
  });
}
