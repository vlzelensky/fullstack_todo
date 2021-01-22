import React from "react";
import axios from "axios";
import { Button, TextField, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import RegisterComponent from "../RegisterComponent";
import "./login.css";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      email: "",
      password: "",
      warning: false,
      warningMessage: "",
      vertical: "top",
      horizontal: "center",
    };
  }

  changeStatus = () => {
    this.setState((state) => ({ status: !state.status }));
  };

  signInOnEnter = async (event) => {
    if (event.key === "Enter") {
      const { email, password } = this.state;
      if (!email || !password) {
        return;
      }
      try {
        const res = await axios.post("api/login", {
          email: email,
          password: password,
        });
        this.props.onLogin(res.data);
        this.props.history.push("/todo");
      } catch (e) {
        console.warn(e);
        if (e.response.status === 400) {
          this.setState({
            warningMessage: e.response.data.message,
            warning: true,
          });
        }
        console.warn(e);
      }
    }
  };

  signIn = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      return;
    }
    try {
      const res = await axios.post("api/login", {
        email: email,
        password: password,
      });
      this.props.onLogin(res.data);
      this.props.history.push("/todo");
    } catch (e) {
      console.warn(e);
      if (e.response.status === 400) {
        this.setState({
          warningMessage: e.response.data.message,
          warning: true,
        });
      }
    }
  };

  handleClose = () => {
    this.setState({ warning: false });
  };

  renderLogin = () => {
    const { warning, warningMessage, vertical, horizontal } = this.state;
    return (
      <div>
        <h1>login</h1>
        <div className="main-box">
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={warning}>
            <Alert onClose={this.handleClose} severity="error">
              {warningMessage}
            </Alert>
          </Snackbar>

          <div className="field">
            <TextField
              variant="outlined"
              autoComplete="off"
              label="Email"
              className="form"
              onChange={(event) =>
                this.setState({ email: event.target.value.trim() })
              }
              onKeyDown={(event) => this.signInOnEnter(event)}
            />
          </div>
          <div className="field">
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              className="form"
              onChange={(event) =>
                this.setState({ password: event.target.value.trim() })
              }
              onKeyDown={(event) => this.signInOnEnter(event)}
            />
          </div>
          <div className="btns">
            <Button
              variant="contained"
              onClick={this.signIn}
              color="default"
              className="btn"
            >
              Sign In
            </Button>
            <div className="span-container">
              <span>or</span>
              <span className="a1" onClick={this.changeStatus}>
                create an account
              </span>
            </div>
          </div>
          <div className="link-container">
            <Link href={"/change_password"} className="a2">
              forgot your password?
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { status } = this.state;
    return (
      <>
        {status ? (
          this.renderLogin()
        ) : (
          <RegisterComponent changeStatus={this.changeStatus} />
        )}
      </>
    );
  }
}

export default LoginComponent;
