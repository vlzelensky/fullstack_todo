import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Button, TextField } from "@material-ui/core";

class RegisterComponent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    errorMessage: "",
    warning: false,
    vertical: "top",
    horizontal: "center",
  };
  saveUserData = async () => {
    const { firstName, lastName, email, password, repeatPassword } = this.state;
    const emailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const passwordSample = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    if (!firstName || !lastName || !email || !password || !repeatPassword) {
      return;
    }
    if (!emailSample.test(email)) {
      this.setState({
        errorMessage: "Enter a valid email address",
        warning: true,
      });
      return;
    }
    if (!passwordSample.test(password) || password.length < 6 ) {
      this.setState({
        errorMessage:
          "Password must contain only latin letters, at least 1 uppercase letter, 1 lowercase letter, 1 numeral and be more than 6 characters",
        warning: true,
      });
      return;
    }
    if (password.length < 6) {
      this.setState({
        errorMessage: "Password length must be more than 6 characters",
        warning: true,
      });
      return;
    }
    if (password === repeatPassword) {
      try {
        const res = await axios.post("/api/register", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        });
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(res.status);
        } else {
          this.props.changeStatus();
        }
      } catch (e) {
        console.warn(e);
      }
    } else {
      this.setState({
        errorMessage: "Passwords don't match",
        warning: true,
      });
    }
  };

  handleClose = () => {
    this.setState({ warning: false });
  };

  render() {
    const { errorMessage, warning, vertical, horizontal } = this.state;
    return (
      <div className="main-box">
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={warning}>
          <Alert onClose={this.handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
        <h1>registration</h1>
        <div className="field">
          <TextField
            autoComplete="off"
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
