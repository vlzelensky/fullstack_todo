import React from "react";

export default function NotEditableTitle(props) {
  return (
    <span
      className="task-title"
      onDoubleClick={() => {
        props.setEditMode(!props.editMode);
      }}
    >
      {props.title}
    </span>
  );
}
