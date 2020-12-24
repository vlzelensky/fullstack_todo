import React, { useState } from "react";

export default function TodoList(props) {
        let [title, setTitle] = useState("");
        let [editMode, setEditMode] = useState(true);
  return (
    <div>
      {props.todos.map((todoitem) => {
        if (editMode) {
          return (
            <div className="main-box">
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value.trim());
                }}
              ></input>
              <button
                onClick={() => {
                  todoitem.title = title;
                  setEditMode(!editMode);
                  console.log(props);
                }}
              >
                edit
              </button>
            </div>
          );
        } else {
            return (
                <div className="main-box">{
                    title
                }
              <button
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                edit
              </button>
            </div>
            )
        }
      })}
    </div>
  );
}
