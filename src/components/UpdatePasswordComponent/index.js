import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

class UpdatePasswordComponent extends React.Component {
  state = {
    email: "",
    newPassword: "",
    repeatNewPassword: "",
    renderFlag: true,
  };

  changeRenderFlag = () => {
    this.setState((state) => ({ renderFlag: !state.renderFlag }));
  };

  renderLogin = () => {
    this.props.history.push("/login");
  };

  checkEmail = async () => {
    const emailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (this.state.email === "") {
      return;
    }
    if (!emailSample.test(this.state.email)) {
      alert("Enter valid email");
      return;
    }
    try {
      await axios
        .post("/api/check_email", {
          email: this.state.email,
        })
        .then((res) => {
          if (res.status !== 201) {
            throw new Error(res.status);
          } else {
            this.changeRenderFlag();
          }
        })
        .catch((e) => {
          alert(e + ", this user doesn't exist");
        });
    } catch (e) {
      console.warn(e);
    }
  };

  changePassword = async () => {
    if (Object.values(this.state).some((value) => value === "")) {
      return;
    }
    if (this.state.newPassword.length < 6) {
      alert("password length must be more than 6 characters");
      return;
    }
    if (this.state.newPassword === this.state.repeatNewPassword) {
      try {
        await axios
          .put("/api/change_password", {
            email: this.state.email,
            newPassword: this.state.newPassword,
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

  renderCheckEmail() {
    return (
      <div className="main-box">
        <h1>change password</h1>
        <div className="field">
          <TextField
            id="standard-basic"
            variant="filled"
            label="Enter your email"
            className="form"
            onChange={(event) =>
              this.setState({ email: event.target.value.trim() })
            }
            value={this.state.email}
          />
          <div className="btns">
            <Button
              variant="contained"
              color="default"
              className="btn"
              onClick={this.renderLogin}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="default"
              className="btn"
              onClick={this.checkEmail}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderChangePassword() {
    return (
      <div className="main-box">
        <h1>change password</h1>
        <div className="field">
          <TextField
            id="standard-basic"
            type="password"
            variant="filled"
            label="New password"
            className="form"
            onChange={(event) =>
              this.setState({ newPassword: event.target.value.trim() })
            }
            value={this.state.newPassword}
          />
        </div>
        <div className="field">
          <TextField
            id="standard-basic"
            type="password"
            variant="filled"
            label="Repeat password"
            className="form"
            onChange={(event) =>
              this.setState({ repeatNewPassword: event.target.value.trim() })
            }
            value={this.state.repeatNewPassword}
          />
        </div>
        <div className="btns">
          <Button
            variant="contained"
            color="default"
            className="btn"
            onClick={this.changeRenderFlag}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="default"
            className="btn"
            onClick={this.changePassword}
          >
            Change password
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { renderFlag } = this.state;
    return (
      <>{renderFlag ? this.renderCheckEmail() : this.renderChangePassword()}</>
    );
  }
}

export default withRouter(UpdatePasswordComponent);
