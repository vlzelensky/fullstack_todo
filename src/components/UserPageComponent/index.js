import React from "react";
import { TextField, Button } from "@material-ui/core";

export default function UserPageComponent(props) {
  return (
    <div className="main-box">
      <TextField defaultValue={props.user.firstName}></TextField>
      <TextField defaultValue={props.user.lastName}></TextField>
      <TextField defaultValue={props.user.email}></TextField>
      <TextField type="password"></TextField>
      <TextField type="password"></TextField>
      <Button onClick={() => console.log(props.user)}>Push</Button>
    </div>
  );
}
