import React from "react";
import Tasks from "./tasks.js";
import { Button } from "@material-ui/core";

export default function Lists(props) {
  return props.lists.map((list) => {
    return (
      <div key={list._id} className="list">
        <div className="task-title"><span >{list.title}</span></div>
        <div className="todo-tasks">
          <Tasks tasks={list.tasks} />
        </div>
        <div className="show-more-btn">
          <Button className="secondary-button"
            onClick={() => {
              props.editList(list._id);
            }}
          >
            Show more
          </Button>
        </div>
      </div>
    );
  });
}
