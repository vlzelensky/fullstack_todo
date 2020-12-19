import React from "react";
import { withRouter } from 'react-router';
import axios from "axios";
import { 
  Button, 
  TextField 
} from "@material-ui/core";
import RegisterComponent from "../RegisterComponent";
import "./login.css";


class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      email: "",
      password: "",
    };
  }

  changeStatus = () => {
    this.setState((state) => ({ status: !state.status }));
  };

  signIn = async () => {
    const { email, password } = this.state;
    if (Object.values(this.state).some((value) => !value)) {
      return;
    }
    try {
      await axios
        .post("api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error(res.status);
          } 
          this.props.history.push('/todo');
        });
    } catch (e) {
      console.warn(e);
    }
  };

  renderChangePassword = () => {
    this.props.history.push('/change_password');
  }

  renderLogin = () => {
    return (
      <div className="main-box">
        <h1>login</h1>
        <div className="field">
          <TextField
            id="standard-basic"
            variant="filled"
            label="Email"
            className="form"
            onChange={(event) =>
              this.setState({ email: event.target.value.trim() })
            }
          />
        </div>
        <div className="field">
          <TextField
            id="standard-basic"
            type="password"
            variant="filled"
            label="Password"
            className="form"
            onChange={(event) =>
              this.setState({ password: event.target.value.trim() })
            }
          />
        </div>
        <div className="btns">
          <Button
            variant="contained"
            onClick={this.signIn}
            color="default"
            className="red-button"
          >
            Sign In
          </Button>
          <span>or</span>
          <span className="a1" onClick={this.changeStatus}>
            create an account
          </span>
        </div>
        <span className="a2" onClick={this.renderChangePassword}>forgot your password?</span>
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

export default withRouter(LoginComponent);
