import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

class RegisterComponent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  saveUserData = async () => {
    const emailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!emailSample.test(this.state.email)) {
      alert("Enter valid email");
      return;
    }
    if (Object.values(this.state).some((value) => value === "")) {
      return;
    }
    if (this.state.password.length < 6) {
      alert("password length must be more than 6 characters");
      return;
    }
    if (this.state.password === this.state.repeatPassword) {
      try {
        await axios
          .post("/api/register", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.status);
            } else {
              this.props.history.push("/todo");
            }
          })
          .catch((e) => {
            alert(e + ", try again later");
          });
      } catch (e) {
        console.warn(e);
      }
    } else {
      alert("passwords don't match");
    }
  };

  render() {
    return (
      <div className="main-box">
        <h1>registration</h1>
        <div className="field">
          <TextField
            autoComplete="none"
            variant="filled"
            label="First name"
            className="form"
            onChange={(event) =>
              this.setState({ firstName: event.target.value.trim() })
            }
            value={this.state.firstName}
          />
        </div>
        <div className="field">
          <TextField
            autoComplete="none"
            variant="filled"
            label="Last name"
            className="form"
            onChange={(event) =>
              this.setState({ lastName: event.target.value.trim() })
            }
            value={this.state.lastName}
          />
        </div>
        <div className="field">
          <TextField
            autoComplete="none"
            variant="filled"
            label="Email"
            className="form"
            onChange={(event) =>
              this.setState({ email: event.target.value.trim() })
            }
            value={this.state.email}
          />
        </div>
        <div className="field">
          <TextField
            autoComplete="none"
            variant="filled"
            label="Password"
            type="password"
            className="form"
            onChange={(event) =>
              this.setState({ password: event.target.value.trim() })
            }
            value={this.state.password}
          />
        </div>
        <div className="field">
          <TextField
            autoComplete="none"
            variant="filled"
            label="Repeat password"
            type="password"
            className="form"
            onChange={(event) =>
              this.setState({ repeatPassword: event.target.value.trim() })
            }
            value={this.state.repeatPassword}
          />
        </div>
        <div className="btns">
          <Button
            variant="contained"
            color="default"
            className="btn reg_btn"
            onClick={this.props.changeStatus}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="default"
            className="btn reg_btn" 
            onClick={this.saveUserData}
            >
            Create account
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterComponent);
