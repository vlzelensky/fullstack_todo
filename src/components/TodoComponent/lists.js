import React from "react";
import Tasks from "./tasks.js";
import { Button } from "@material-ui/core";

export default function Lists(props) {
  return props.lists.map((list) => {
    return (
      <div className="main-box list">
        <span className="task-title">{list.title}</span>
        <div className="todo-tasks">
          <Tasks tasks={list.tasks} />
        </div>
        <div className="show-more-btn">
          <Button>Show more</Button>
        </div>
      </div>
    );
  });
}
