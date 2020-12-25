import React, { useState }from "react";

export default function NotEditableTitle(props) {
  return <span onDoubleClick={() => {props.setEditMode(!props.editMode)}}>{props.title}</span>;
}
