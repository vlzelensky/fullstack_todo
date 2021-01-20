import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function UserPageComponent(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const changeData = () => {
    const changes = {};
    if (firstName !== props.user.firstName && firstName !== "") {
      console.log(props.user.email);

      changes["firstName"] = firstName;
    }
    if (lastName !== props.user.lastName && lastName !== "") {
      changes["lastName"] = lastName;
    }
    if (email !== props.user.email && email) {
      changes["email"] = email;
    }
    if (password.length >= 6) {
      changes["password"] = password;
      if(changes.password !== repeatPassword) {
        alert("не совпадают")
      }
    } else if (password.length && password.length < 6) {
      alert("должен быть больше 6")
    }
    // if (changes.password && changes.password.length > 6) {
    // }
    // if (changes.password.length >= 6 && changes.password !== repeatPassword) {
    //   alert(2)
    // }
    if (Object.values(changes).length) {
      console.log(changes)
    }
    console.log(changes)
  };

  return (
    <div className="main-box">
      <TextField
        onChange={(event) => setFirstName(event.target.value)}
        defaultValue={props.user.firstName}
      ></TextField>
      <TextField
        onChange={(event) => setLastName(event.target.value)}
        defaultValue={props.user.lastName}
      ></TextField>
      <TextField
        onChange={(event) => setEmail(event.target.value)}
        defaultValue={props.user.email}
      ></TextField>
      <TextField
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      ></TextField>
      <TextField type="password"></TextField>
      <Button onClick={() => changeData()}>Push</Button>
    </div>
  );
}
