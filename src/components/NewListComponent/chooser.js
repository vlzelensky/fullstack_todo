import React, { useState } from "react";
import EditableTitle from "./editable";
import NotEditableTitle from "./noteditable";

export default function ChooseTitle(props) {
  const [editMode, setEditMode] = useState(true);
  if (editMode) {
    return <EditableTitle changeTitle={props.changeTitle} title={props.title} setEditMode={setEditMode} editMode={editMode} />;
  } else {
    return <NotEditableTitle title={props.title} setEditMode={setEditMode} editMode={editMode} />;
  }
}
