import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import ChangePassComponent from "./changepass";

class CheckEmailComponent extends React.Component {
  state = {
    email: "",
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

  renderCheckEmail() {
    return (
      <div>
        <h1>change password</h1>
        <div className="main-box">
          <div className="field">
            <TextField
              autoComplete="off"
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
      </div>
    );
  }

  render() {
    const { renderFlag } = this.state;
    return (
      <>
        {renderFlag ? (
          this.renderCheckEmail()
        ) : (
          <ChangePassComponent changeRenderFlag={this.changeRenderFlag} />
        )}
      </>
    );
  }
}

export default withRouter(CheckEmailComponent);
