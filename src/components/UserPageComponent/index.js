import React, { useState, useEffect } from "react";
import { TextField, Button, Avatar } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import api from "../../services/api";
import MD5 from "crypto-js/md5";
import "./index.css";

export default function UserPageComponent(props) {
  const user = props.user;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hashed, setHashed] = useState(null);
  const vertical = "top";
  const horizontal = "center";

  const changeData = async () => {
    const passwordSample = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    const emailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const changes = {};
    if (firstName !== props.user.firstName && firstName !== "") {
      changes["firstName"] = firstName;
    }
    if (lastName !== props.user.lastName && lastName !== "") {
      changes["lastName"] = lastName;
    }
    if (email !== props.user.email && email) {
      if (!emailSample.test(email)) {
        setErrorMessage("Enter a valid email address");
        setWarning(true);
        return;
      }
      changes["email"] = email;
    }
    if (password !== "") {
      if (password.length < 6 || !passwordSample.test(password)) {
        setErrorMessage(
          "Password must contain only latin letters, at least 1 uppercase letter, 1 lowercase letter, 1 numeral and be more than 6 characters"
        );
        setWarning(true);
        return;
      } else {
        if (password.length > 5) {
          if (password !== repeatPassword) {
            setErrorMessage("Passwords don't match");
            setWarning(true);
            return;
          } else {
            changes["password"] = password;
          }
        }
      }
    }
    if (Object.values(changes).length) {
      await api().put("/api/user", changes);
      props.history.push("/todo");
      props.getUser();
    }
  };

  const handleClose = () => {
    setWarning(false);
  };

  useEffect(() => {
    if (user) {
      setHashed(MD5(user.email).toString());
    }
  }, [user]);

  return (
    <div className="main-box">
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={warning}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="userdata-container">
        <div className="avatar-container">
          <Avatar src={"https://www.gravatar.com/avatar/" + hashed}></Avatar>
        </div>
        <span>First Name</span>
        <TextField
          className="user-page-input"
          onChange={(event) => setFirstName(event.target.value)}
          defaultValue={props.user.firstName}
        ></TextField>
        <span>Last Name</span>
        <TextField
          className="user-page-input"
          onChange={(event) => setLastName(event.target.value)}
          defaultValue={props.user.lastName}
        ></TextField>
        <span>Email</span>
        <TextField
          className="user-page-input"
          onChange={(event) => setEmail(event.target.value)}
          defaultValue={props.user.email}
        ></TextField>
        <span>Password</span>
        <TextField
          className="user-page-input"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        ></TextField>
        <span>Repeat password</span>
        <TextField
          className="user-page-input"
          onChange={(event) => setRepeatPassword(event.target.value)}
          type="password"
        ></TextField>
      </div>
      <div className="save-btn-container">
        <Button className="btn cancel-btn" onClick={() => {props.history.push("/todo")}}>Cancel</Button>
        <Button className="btn" onClick={() => changeData()}>
          Save
        </Button>
      </div>
    </div>
  );
}
