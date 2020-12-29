import React from "react";
import Tasks from "./tasks.js";
import { Button } from "@material-ui/core";

export default function Lists(props) {
  return props.todoLists.map((list) => {
    return (
      <div className="main-box list">
        <span className="task-title">{list.title}</span>
        <div className="todo-tasks">
          <Tasks tasks={props.tasks} list={list} />
        </div>
        <div className="show-more-btn">
          <Button>Show more</Button>
        </div>
      </div>
    );
  });
}
